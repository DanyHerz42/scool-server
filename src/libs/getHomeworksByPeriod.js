const query = require('../db/mysql.conn');

exports.getHomeworksByPeriod = async(id_period) => {
  const homeworks = await query(`SELECT * FROM homeworks WHERE id_period = ${id_period}`)
  let homWFiles = await Promise.all(homeworks.map(async element => {
    element.filesAttached = await Promise.resolve(await query(`SELECT * FROM attachments WHERE id_homework = ${element.id_homework}`));
    return Promise.resolve(element);
  })); 

  const announcements = await query(`SELECT * FROM announcements WHERE id_period = ${id_period}`)
  let annWFiles = await Promise.all(announcements.map(async element => {
    element.filesAttached = await Promise.resolve(await query(`SELECT * FROM attachments_announcements WHERE id_announcement = ${element.id_announcement}`));
    return Promise.resolve(element);
  })); 

  let thisPeriod = homWFiles.concat(annWFiles); 

  thisPeriod = thisPeriod.sort((a,b) => {
    return a.creation_date > b.creation_date ? -1 : a.creation_date < b.creation_date ? 1 :0;
  })
  
  return thisPeriod;
  // console.log(await Promise.resolve(annWFiles));
  // let workflow = []
  // workflow = workflow.concat(vecTwo, vecOne);

  // console.log(await Promise.all(workflow)); 
  // console.log(vecOne);
  // console.log(vecTwo);


  // let homeworks = await getHomeworksFiles(id_period);
  // let homeworks = await getHomeworksFiles(id);
//  return await Promise.resolve(homWFiles);
}