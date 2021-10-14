const { randomKey } = require('../libs/randomClave')
const query = require('../db/mysql.conn');
const fs = require('fs');
const path = require('path')

exports.createClass = async (req, res) => {
  try {
    const request = req.body;
    const randomKeyGen = await randomKey();
    request.unique_identifier = randomKeyGen;
    request.id_status = 1;
    const newClass = await query(`INSERT INTO classes SET ?`, request)
    fs.mkdirSync(path.join(__dirname, `/../uploads/${randomKeyGen}`), {recursive: true});
    res.status(200).json({ok:true, message: "clase creada", randomKeyGen})
  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false,error})
  }
}

exports.getClassesTeacher = async (req, res) => {
  try {
    const getIdTeacher = await query(`SELECT id_teacher FROM teachers WHERE id_user = ${req.userFound[0].id_user}`)
    const classes = await query(`SELECT * FROM classes WHERE id_teacher = ${getIdTeacher[0].id_teacher}`);
    res.status(200).json({ok: true, message: `Estas son las classes`, classes})
  } catch (error) {
    res.status(500).json({ok: false,error})
  }
}
