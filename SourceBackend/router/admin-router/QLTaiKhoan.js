var express = require('express');
var router = express.Router();
var moment = require('moment');
var passport = require('passport');
var userModel = require('../../model/thanhvien.model')

// router.get('/delete/:id',(req,res,next) => {
//     var id = req.params.id;
//     res.redirect('/admin/taikhoan/delete');
// })

router.post('/delete/:id', (req, res, next) => {
    var id = req.params.id
    var entity = {
        idTaiKhoan: id,
        Xoa: 1
    }
    userModel.update(entity).then(n => {
        res.redirect('/admin/taikhoan');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.get('/edit/:id', (req, res, next) => {
    var id = req.params.id;
    userModel.GetAllById(id).then(tk => {
        res.render('admin/TaiKhoan/EditTaiKhoan', {
            member: tk[0],
            layout: './indexAdmin'

        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
        console.log(member);
    })

})

router.get('/edit/:id', (req, res, next) => {
    var id = req.params.id;
    userModel.GetAllById(id).then(tk => {
        res.render('admin/TaiKhoan/EditTaiKhoan', {
            member: tk[0],
            layout: './indexAdmin'

        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
        console.log(member);
    })

})

router.post('/edit', (req, res, next) => {
    var temp = req.body;
    userModel.getIDByEmail(temp.email).then(row => {
        var entity = {
            idTaiKhoan: row[0].idTaiKhoan,
            hoten: temp.ten,
            email: temp.email,
            ngaysinh: temp.date,
            NgayTaoTK: temp.da
        }
        userModel.update(entity).then(id => {
            res.redirect('/admin/taikhoan')
        })
    })

})

module.exports = router;