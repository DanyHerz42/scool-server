const query = require('../db/mysql.conn');

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

exports.registerInClass = async(req, res) => {
  const {unique_identifier} = req.body;
  console.log(req.userFound);
  try {
    const getIdStudent = await query(`SELECT id_student FROM students WHERE id_user = ${req.userFound[0].id_user}`)
    const verifyClass = await query(`SELECT id_class FROM classes WHERE unique_identifier = "${unique_identifier}";`)
    if(verifyClass < 1){
      return res.status(401).json({message: "Esta clase no existe"})
    }
    const addClass = await query(`INSERT INTO relation_students_classes SET ?`, {id_class: verifyClass[0].id_class, id_student: getIdStudent[0].id_student, id_status: 1})
    res.status(200).json({message: "Alumno registrado exitosamente"})
  } catch (error) {
    res.status(500).json({message: "Algo ha fallado", error})
  }
}

exports.getClasses = async(req, res) => {
  try {
    const getIdStudent = await query(`SELECT id_student FROM students WHERE id_user = ${req.userFound[0].id_user}`)
    const classes = await query(`SELECT classes.name, classes.description, classes.color, teachers.id_teacher, users.name_user AS teacher_username FROM students 
                                JOIN relation_students_classes ON students.id_student = relation_students_classes.id_student
                                JOIN classes ON relation_students_classes.id_class = classes.id_class
                                JOIN teachers ON teachers.id_teacher = classes.id_teacher
                                JOIN users ON teachers.id_user = users.id_user WHERE students.id_student = ${getIdStudent[0].id_student};`);
    res.status(200).json({ok: true, message: "Estas son las classes de este alumno", classes})
  } catch (error) {
    res.status(500).json({ok: false, message: "Algo ha fallado", error})
  }
}