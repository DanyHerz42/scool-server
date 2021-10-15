const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const query = require('../db/mysql.conn')

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      //selecciono el unique_identifier para acceder a la carpeta de la clase
      const selecClass = await query(`SELECT id_class, unique_identifier FROM classes WHERE id_class = ${req.body.id_class}`)
      //selecciono el siguiente id de homworks a insertar, para sumarle 1 y obtener el id nuevo
      let selectLast = await query(`SELECT id_announcement FROM announcements ORDER BY id_announcement DESC LIMIT 1`);
      let nuevoId;
      if(selectLast.length < 1){
        nuevoId = 1
      }else{
        nuevoId = parseInt(selectLast[0].id_announcement) + 1;
        console.log(selectLast);
      }
      
      const nameFolderTarea = selecClass[0].unique_identifier; 
      //si no existe la carpeta de la tarea la creo
      if (!fs.existsSync(path.join(__dirname, `/../uploads/${nameFolderTarea}/AN_${nuevoId}`))) {
        fs.mkdirSync(path.join(__dirname, `/../uploads/${nameFolderTarea}/AN_${nuevoId}`))
      }
      req.nameFolderTarea = nameFolderTarea;
      req.id_class = selecClass[0].id_class;

      //guardado de archivo
      cb(null, `src/uploads/${nameFolderTarea}/AN_${nuevoId}`) 
    } catch (error) {
      console.log(error);
    }

  },
  filename: (req, file, cb) => {
    cb("", `${file.originalname}`)
  }
})

const upload = multer({
  storage: storage
})

const { createAnnoucements } = require('../controllers/annoucements.controller')

router.post("/create-annoucement", validarJWT, upload.array("files") ,createAnnoucements)

module.exports = router;