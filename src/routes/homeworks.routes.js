const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const multer = require('multer');
const query = require('../db/mysql.conn')
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      //selecciono el unique_identifier para acceder a la carpeta de la clase
      const selecClass = await query(`SELECT classes.id_class, classes.unique_identifier FROM classes JOIN class_periods ON class_periods.id_class = classes.id_class WHERE class_periods.id_period = ${req.body.id_period}`)
      //selecciono el siguiente id de homworks a insertar, para sumarle 1 y obtener el id nuevo
      const selectLast = await query(`SELECT id_homework FROM homeworks ORDER BY id_homework DESC LIMIT 1`);
      const nuevoId = parseInt(selectLast[0].id_homework) + 1;
      const nameFolderTarea = selecClass[0].unique_identifier;
      //si no existe la carpeta de la tarea la creo
      if (!fs.existsSync(path.join(__dirname, `/../uploads/${nameFolderTarea}/HM_${nuevoId}`))) {
        fs.mkdirSync(path.join(__dirname, `/../uploads/${nameFolderTarea}/HM_${nuevoId}`))
      }
      req.nameFolderTarea = nameFolderTarea;
      req.id_class = selecClass[0].id_class;

      //guardado de archivo
      cb(null, `src/uploads/${nameFolderTarea}/HM_${nuevoId}`)
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


const { createHomework, getHomeworkById, getHomeworkByClassId} = require('../controllers/homeworks.controller');
// 

router.post('/create-homework', validarJWT, upload.array('files'), createHomework);
router.get('/get-homework-by-id/:id', getHomeworkById);
router.get('/get-homeworks-from-class/:id', getHomeworkByClassId)

module.exports = router;