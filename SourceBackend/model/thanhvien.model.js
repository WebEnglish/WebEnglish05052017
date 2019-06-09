var db = require('../utils/Database');
module.exports = {
  add: entity => {
    return db.add('taikhoan', entity);
  },
  
  getPassbyEmail: email =>{
    return db.load(`select * from taikhoan where email = '${email}'`);

  },
};