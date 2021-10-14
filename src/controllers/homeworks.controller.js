const path = require('path');
const fs = require('fs');
const query = require('../db/mysql.conn');

exports.createHomework = async (req, res) => {
  try {
    const insertHomework = await query(`INSERT INTO homeworks SET ?`, req.body)
    req.files.forEach(async element => {
      const insertArchivo = await query(`INSERT INTO attachments SET ?`, { filename: element.originalname, url: path.join(`/uploads/${req.nameFolderTarea}/${insertHomework.insertId}/${element.originalname}`), id_homework: insertHomework.insertId })
    });
    const returnData = await query(`SELECT * FROM homeworks WHERE id_homework = ${insertHomework.insertId}`);
    const files = await query(`SELECT * FROM attachments WHERE id_homework = ${insertHomework.insertId}`)

    returnData.push({ files: files })
    res.status(200).json({ ok: true, message: "Esta es la info de la clase creada", returnData })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Algo a salido mal" })
  }
}

exports.getHomeworkById = async (req, res) => {
  const { id } = req.params;
  try {
    const returnData = await query(`SELECT * FROM homeworks WHERE id_homework = ${id}`);
    const files = await query(`SELECT * FROM attachments WHERE id_homework = ${id}`)

    returnData.push({ filesAttached: files })
    res.status(200).json({ ok: true, message: "Esta es la info de la clase creada", returnData })

  } catch (error) {
    res.status(500).json({ ok: false, message: "Algo a salido mal" })
  }
}

exports.getHomeworkByClassId = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await query(`SELECT * FROM homeworks WHERE id_class = ${id} AND status_homework = "ACTIVE"`);
    if(data.length < 1){
      return res.status(200).json({ok: false, message: "No hay tareas activas"})
    }
    let homeworks = await Promise.all(data.map(async (e) => {
      const files = await query(`SELECT * FROM attachments WHERE id_homework = ${e.id_homework}`);
      e.filesAttached = await Promise.resolve(files);
      
      return await e
    }))

    await Promise.all(res.status(200).json({ok: true, message: "Estas son las tareas activas", homeworks}))

  } catch (error) {
    console.log(error);
  }
}