const query = require("../db/mysql.conn")

exports.createNewPeriod = async(info, id_class) => {
  try {
    info.forEach(async element => {
      const start_date = new Date(element.start_date)
      const end_date = new Date(element.end_date)
      const insertPeriod = await query(`INSERT INTO class_periods SET ?`, {start_date, end_date, period_name: element.period_name, id_class});
    });
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
}