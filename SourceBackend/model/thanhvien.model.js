var db = require('../utils/Database');
module.exports = {

  add: entity => {
    return db.add('taikhoan', entity);
  },
  
  getPassbyEmail: email =>{
    return db.load(`select * from taikhoan where email = '${email}' and Xoa = 0`);
  },
  checkPass: pass => {
    return db.load(`select * from taikhoan where matKhau = '${pass}' and Xoa = 0`);
  },

  all: () => {
    return db.load('select * from taikhoan where Xoa = 0');
  },

  getListbyPH: id =>{
    return db.load(`select * FROM phanhe as ph , taikhoan as tk where tk.Xoa = 0 and ph.idPhanHe = '${id}' and tk.phanhe = ph.idPhanHe`  )
  },

  delete: id => {
    return db.delete('taikhoan', 'idTaiKhoan', id);
  }
  ,
  update: entity => {
    return db.update('taikhoan', 'idTaiKhoan', entity);
  },

  GetAllById: id => {
    return db.load(`select * from taikhoan where idTaiKhoan = '${id}' and Xoa = 0`);
  },

  getIDByEmail: email => {
    return db.load(`select * from taikhoan where email = '${email}' and Xoa = 0`);
  }


};