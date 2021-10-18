const query = require(`../db/mysql.conn`)
exports.addPending = async(id_class, id_homework) => {
  const students = await query(`SELECT users.id_user, users.name_user, users.lastname, users.nickname, students.biography, students.id_student, students.image, users.email FROM classes JOIN relation_students_classes ON classes.id_class = relation_students_classes.id_class JOIN students ON relation_students_classes.id_student = students.id_student JOIN users ON students.id_user = users.id_user WHERE classes.id_class = ${id_class}`)
  students.forEach(async element => {
    const insertPending = await query(`INSERT INTO pendings SET ?`, {id_student: element.id_student, id_homework, status: "ACTIVE"});
  });
}