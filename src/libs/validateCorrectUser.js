const query = require('../db/mysql.conn');

const validateEmail = async (correo) => {
  try {
    let usuarios = await query(`SELECT * FROM users WHERE email = "${correo}"`);
    if(usuarios.length > 0){
      return false;
    }else{
      return true
    }
  } catch (error) {
    console.error(error);
  }
}

const validateUsername = async (name_user) => {
  try {
    let usuarios = await query(`SELECT * FROM users WHERE name_user = "${name_user}"`);
    if(usuarios.length > 0){
      return false;
    }else{
      return true
    }
  } catch (error) {
    console.error(error);
  }
}

const validateRole = async (role) => {
  try {
    let roles = await query(`SELECT * FROM roles WHERE id_role = ${role}`);
    if(roles.length > 0){
      return true;
    }else{
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

const verifyPassword = async (password, repeatPassword) => {
  if(password === repeatPassword){
    return true;
  }else{
    return false;
  }
}

const validateNickname = async (nickname) => {
  try {
    let usuarios = await query(`SELECT * FROM users WHERE nickname = "${nickname}"`);
    if(usuarios.length > 0){
      return false;
    }else{
      return true
    }
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  validateEmail,
  validateUsername,
  validateRole,
  verifyPassword,
  validateNickname
}