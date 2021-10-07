const query = require('../db/mysql.conn');

exports.getOrgs = async (req, res) => {
  try {
    const orgs = await query(`SELECT * FROM organizations;`)
    res.status(200).json({message:"Estas son las organizaciones disponibles", orgs})
  } catch (error) {
    res.status(500).json(error)
  }
}