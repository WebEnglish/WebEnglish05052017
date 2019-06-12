var db = require('../utils/Database');
module.exports = {
    all: () => {
        return db.load('select ct.*, cd.TenBai as ChuDe from dscautruc as ct, chudebaihoc as cd where ct.Xoa = 0 and ct.CDBaiHoc = cd.idCDBaiHoc');
    },
    getNPbyID: id => {
        return db.load(`select ct.* , cd.* from dscautruc as ct,chudebaihoc as cd where ct.idCauTruc = '${id}' and ct.Xoa = 0 and ct.CDBaiHoc = cd.idCDBaiHoc`)
    }, 
    updateCT: entity => {
        return db.update('dscautruc', 'idCauTruc', entity);
    },
    updateCD: entity => {
        return db.update('chudebaihoc', 'idCDBaiHoc', entity);
    },
}