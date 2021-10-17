const query = require("../db/mysql.conn")

exports.getHomeworksFiles = async(id_homework) => {
  try {

    const selectFiles = await query(`SELECT * FROM attachments WHERE id_homework = ${id_homework}`);

    return selectFiles;
  } catch (error) {
    console.log(error);
  }
}