const query = require("../db/mysql.conn")

exports.getAnnouncementsFiles = async(id_class) => {
  try {
    
    const selectAnnoun = await query(`SELECT * FROM announcements WHERE ?`, id_class);

    let arrayAnnoun = await Promise.all(selectAnnoun.map(async element => {
      const selectFiles = await query(`SELECT * FROM attachments_announcements WHERE ?`, {id_announcement: element.id_announcement})
      element.filesAttached = await Promise.resolve(selectFiles)
      return await Promise.resolve(element)
    }))
    return await Promise.all(arrayAnnoun);
  } catch (error) {
    console.log(error);
  }
}