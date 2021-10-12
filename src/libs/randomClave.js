const query = require('../db/mysql.conn');
const randomstring = require("randomstring");
exports.randomKey = async() => {
  const key = randomstring.generate(7)
  const posibleClases = await query(`SELECT * FROM classes WHERE unique_identifier = "${key}";`)
  if(posibleClases.length > 0){
    this.randomKey();
  }else{
    return key;
  }
}