const query = require("../db/mysql.conn")

exports.getAnnouncementsFiles = async(id_period) => {
  try {
    
    const selectAnnoun = await query(`SELECT * FROM announcements WHERE id_period = ${id_period}`);
    console.log(selectAnnoun)
    let arrayAnnoun = await selectAnnoun.map(async element => {
      const selectFiles = await query(`SELECT * FROM attachments_announcements WHERE id_announcement = ${element.id_announcement}`)
      element.filesAttached = await Promise.resolve(selectFiles)
      return await element
    })
    return arrayAnnoun;
  } catch (error) {
    console.log(error);
  }
}