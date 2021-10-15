const query = require("../db/mysql.conn")

exports.getHomeworksFiles = async(id_class) => {
  try {
    const selectAnnoun = await query(`SELECT * FROM homeworks WHERE ?`, id_class)
    let arrayAnnoun = await Promise.all(selectAnnoun.map(async element => {
      const selectFiles = await query(`SELECT * FROM attachments WHERE ?`, {id_homework: element.id_homework})
      element.filesAttached = await Promise.resolve(selectFiles)
      return await Promise.resolve(element)
    })) 

    return await Promise.all(arrayAnnoun);
  } catch (error) {
    console.log(error);
  }
}