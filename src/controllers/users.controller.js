const query = require('../db/mysql.conn');
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const {config} = require(`../config`)
const { validateEmail, validateUsername, validateRole, verifyPassword, validateNickname} = require('../libs/validateCorrectUser')

exports.registroUsuario = async (req, res) => {
  const { name_user, lastname, nickname, email, password_, repeat_password, role} = req.body;
  try {
    if(! await validateUsername(name_user)){
      res.status(500).json({status: "500", message: "Ese usuario ya existe"})
      return
    }

    if(!await validateEmail(email)){
      res.status(500).json({status: "500", message: "Ese correo ya esta registrado"})
      return
    }

    let formatNick = nickname.toLowerCase().trim().split(" ").join("_")

    if(!await validateNickname(formatNick)){
      res.status(500).json({status: "500", message: "Ese nickname ya esta registrado"})
      return
    }

    if(!await validateRole(role)){
      res.status(500).json({status: "500", message: "El role es incorrecto"})
      return
    }

    if(!await verifyPassword(password_, repeat_password)){
      res.status(500).json({status: "500", message: "las contraseñas no coinciden"})
      return
    }

    //encriptacion de contraseña
    const salts = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_,salts);
    console.log(password_);

    const insertUser = await query(`INSERT INTO users (name_user, lastname, nickname, email, password_, id_role, id_status) VALUES ("${name_user}","${lastname}","${formatNick}","${email}","${hash}","${role}", 1);`)
    const newUser = await query(`SELECT * FROM users WHERE email = "${email}"`)
    const token = JWT.sign({ newUser }, config.secret, {
      expiresIn: '2hr'
    });

    res.status(200).json({status: "200", message:"Usuario insertado con exito", token})
 
  } catch (error) {
    res.send(error)
  }
}

exports.login = async (req, res) => {
  const loginParameter = req.body.email || req.body.nickname;
  try {
    let userFound = await query(`SELECT * FROM users WHERE email = "${loginParameter}" OR nickname = "${loginParameter}"`)
    if(userFound.length < 1){
      res.status(500).json({message: "Nickname o email incorrecto"})
      return
    }
    let comparePassword = await bcrypt.compare(req.body.password, userFound[0].password_);
    if(comparePassword){
      let token = JWT.sign({ userFound }, config.secret, {
        expiresIn: '2h'
      });
      res.status(200).json({message: "Usuario loggeado con exito", token})
    }else{
      res.status(500).json({message: "Contraseña incorrectos "})
    }
    
  } catch (error) {
    res.status(500).json({message: "Error, algo fallo en la peticion", error})
  }
}

exports.revalidarToken = (req,res) => {

  const userFound = req.userFound;
  const token = JWT.sign({userFound}, config.secret, {
    expiresIn: '2h'
  })

  res.json({
    ok: true,
    message: 'Revalidación de token correcta',
    token
  })
}