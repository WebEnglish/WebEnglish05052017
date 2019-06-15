var db = require('../utils/Database');

module.exports = {
  list: () => {
    return db.load('SELECT t.*, tk.hoten FROM tips AS t, taikhoan AS tk WHERE t.Xoa =0 AND t.NguoiDang = tk.idTaiKhoan AND tk.Xoa = 0 ORDER BY t.NgayDang');
  },
  chitiet: (idBV) =>{
    return db.load(`SELECT t.*, tk.hoten FROM tips AS t, taikhoan AS tk WHERE t.Xoa =0 AND t.NguoiDang = tk.idTaiKhoan AND tk.Xoa = 0 AND t.idTips = ${idBV}`)
  }
}