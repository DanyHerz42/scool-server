const query = require('../db/mysql.conn');
const { get } = require('../routes/users.routes');

exports.completeInfo = async(req, res) => {
  const {biography, image, name_org} = req.body;
  const {id_user} = req.userFound[0];
  try {
    const org = await query(`SELECT id_org FROM organizations WHERE name_org = "${name_org}"`)
    if(org.length < 1 ){
      res.status(401).json({message: "Esa organizacion no existe"})
    }
    let objInsert = {
      biography,
      image,
      quantity_badges: 0,
      id_org: org[0].id_org,
      id_status: 1,
      id_user
    }
    const insertStudent = await query(`INSERT INTO students SET ?`, objInsert)
    res.status(200).json({message:"Info completada con exito"})
  } catch (error) {
    res.status(500).json({error})
  }
}

exports.getProfile = async(req, res) => {
  let {userFound} = req;
  try {
    const getProfile = await query(`SELECT * FROM students JOIN organizations ON organizations.id_org = students.id_org WHERE ?`, {id_user: req.userFound[0].id_user})
    getProfile.unshift(userFound)
    res.status(200).json({message: "Esta es la info del usuario", getProfile})
  } catch (error) {
    res.status(500).json({message: "Algo ha fallado", error})
  }
}