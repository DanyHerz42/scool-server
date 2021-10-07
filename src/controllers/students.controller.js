const query = require('../db/mysql.conn');
exports.completeInfo = async(req, res) => {
  const {biography, image, name_org} = req.body;
  const {id_user} = req.userFound[0];
  try {
    const org = await query(`SELECT id_org FROM organizations WHERE name_org = "${name_org}"`)
    if(org.length < 1 ){
      res.status(401).json({message: "Esa organizacion no existe"})
    }
    let objInsert = {
      biography,
      image,
      quantity_badges: 0,
      id_org: org[0].id_org,
      id_status: 1,
      id_user
    }
    const insertStudent = await query(`INSERT INTO students SET ?`, objInsert)
    res.status(200).json({message:"Info completada con exito"})
  } catch (error) {
    res.status(500).json({error})
  }
}