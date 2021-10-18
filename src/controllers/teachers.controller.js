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
      id_org: org[0].id_org,
      id_status: 1,
      id_user
    }
    const insertTeacher = await query(`INSERT INTO teachers SET ?`, objInsert)
    res.status(200).json({message:"Info completada con exito"})
  } catch (error) {
    res.status(500).json({error})
  }
}

exports.getProfile = async (req, res) => {
  let { userFound } = req;
  try {
    const getProfile = await query(`SELECT users.id_user, users.name_user, users.lastname, users.nickname, teachers.id_teacher, teachers.image, organizations.id_org, organizations.name_org  FROM teachers JOIN organizations ON organizations.id_org = teachers.id_org JOIN users ON teachers.id_user = users.id_user  WHERE teachers.id_user = ${req.userFound[0].id_user}`)
    res.status(200).json({ message: "Esta es la info del teacher", getProfile })
  } catch (error) {
    res.status(500).json({ message: "Algo ha fallado", error })
  }
}