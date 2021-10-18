const path = require('path');
const fs = require('fs');
const query = require('../db/mysql.conn');
const { addPending } = require('../libs/addPending');

exports.createHomework = async (req, res) => {
  try {
    const {body} = req;
    const insertHomework = await query(`INSERT INTO homeworks SET ?`, body);
    const id_class = await query(`SELECT classes.id_class FROM classes JOIN class_periods ON class_periods.id_class = classes.id_class WHERE id_period = ${body.id_period}`)
    addPending(id_class[0].id_class, insertHomework.insertId);
    req.files.forEach(async element => {
      const insertArchivo = await query(`INSERT INTO attachments SET ?`, { filename: element.originalname, url: `/uploads/${req.nameFolderTarea}/HM_${insertHomework.insertId}/${element.originalname}`, id_homework: insertHomework.insertId })
    });
    const returnData = await query(`SELECT * FROM homeworks WHERE id_homework = ${insertHomework.insertId}`);
    const files = await query(`SELECT * FROM attachments WHERE id_homework = ${insertHomework.insertId}`)
    returnData.push({ files: files })
    res.status(200).json({ ok: true, message: "Esta es la info de la tarea creada", returnData })
  } catch (error) {
    res.status(500).json({ ok: false, message: "Algo a salido mal" })
    console.log(error);
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
      return res.status(200).json({ok: false2, message: "No hay tareas activas"})
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

