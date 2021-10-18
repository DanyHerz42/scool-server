const { randomKey } = require('../libs/randomClave')
const query = require('../db/mysql.conn');
const fs = require('fs');
const path = require('path');
const { createNewPeriod } = require('../libs/createNewPeriod');
const { getHomeworksByPeriod } = require('../libs/getHomeworksByPeriod');

exports.createClass = async (req, res) => {
  try {
    //recibe el body
    const {name, quota, description, color, periods} = req.body;
    const id_teacher = await query(`SELECT id_teacher FROM teachers WHERE id_user = ${req.userFound[0].id_user}`)
    console.log(id_teacher)
    // genera la clave
    const randomKeyGen = await randomKey();
    const newClass = await query(`INSERT INTO classes SET ?`, {name, quota, description, id_teacher : id_teacher[0].id_teacher, color, unique_identifier: randomKeyGen, id_status: 1})
    fs.mkdirSync(path.join(__dirname, `/../uploads/${randomKeyGen}`), {recursive: true});
    const insertarPeriodos = await createNewPeriod(periods, newClass.insertId);
    console.log(insertarPeriodos);
    res.status(200).json({ok:true, message: "clase creada", randomKeyGen});
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

exports.getWorkflow = async(req, res) => {
  try {
    const periods = await query(`SELECT * FROM class_periods WHERE ?`, req.params)
    let arrPeriods = await Promise.all(periods.map(async element => {
      element.workflow = await getHomeworksByPeriod(element.id_period)
      return element
    }));
    
    res.status(200).json({ok: true, message: "Este es el workflow dividido por periodos", arrPeriods});
    
  } catch (error) {
    res.status(500).json({ok: false, error})
    console.log(error);
  }
}

exports.getIntegrantsClass = async(req, res) => {
  try {
    const {id_class} = req.params;
    const classInfo = await query(`SELECT * FROM classes WHERE id_class = ${id_class}`)
    const students = await query(`SELECT users.id_user, users.name_user, users.lastname, users.nickname, students.biography, students.image, users.email FROM classes JOIN relation_students_classes ON classes.id_class = relation_students_classes.id_class JOIN students ON relation_students_classes.id_student = students.id_student JOIN users ON students.id_user = users.id_user WHERE classes.id_class = ${id_class}`)
    const teacher = await query(`SELECT users.id_user, users.name_user, users.lastname, users.nickname, teachers.biography, teachers.image, users.email FROM classes JOIN teachers ON classes.id_teacher = teachers.id_teacher JOIN users ON teachers.id_user = users.id_user WHERE id_class = ${id_class}`)
    let integrants = {
      teacher,
      students
    }
    res.status(200).json({ok: true, message: "Estos son los integrantes de la clase", classInfo ,integrants})
  } catch (error) {
    console.log(error);
  }

}