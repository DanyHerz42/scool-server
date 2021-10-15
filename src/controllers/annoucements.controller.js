const query = require("../db/mysql.conn");
const path = require('path')

exports.createAnnoucements = async(req, res) => {
  const {body} = req;
  try {
    const insertAnnouncement = await query(`INSERT INTO announcements SET ?`, body)
    req.files.forEach(async element => {
      const insertFile = await query(`INSERT INTO attachments_announcements SET ?`, {filename: element.originalname, url: `/uploads/${req.nameFolderTarea}/AN_${insertAnnouncement.insertId}/${element.originalname}`, id_announcement: insertAnnouncement.insertId})
    });
    const returnData = await query(`SELECT * FROM announcements WHERE id_announcement = ${insertAnnouncement.insertId}`);
    const files = await query(`SELECT * FROM attachments_announcements WHERE id_announcement = ${insertAnnouncement.insertId}`)
    returnData.push({ files: files })
    res.status(200).json({ ok: true, message: "Esta es la info del anuncio creado", returnData })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Algo ha salido mal", error})
    console.log(error);
  }
}