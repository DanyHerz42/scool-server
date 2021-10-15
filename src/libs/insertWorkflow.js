const query = require("../db/mysql.conn")

exports.insertWorkflow = async(id_class, id_item, id_status = 1, type_) => {
  try {
    const insertIntoWorkflow = await query(`INSERT INTO workflow SET ?`, {id_class, id_item, id_status, type_});
  } catch (error) {
    console.error(error)
  }
}