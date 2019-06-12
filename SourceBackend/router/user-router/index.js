var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var userModel = require('../../model/thanhvien.model');
var abcModel = require('../../model/DSmuchoc.model');




router.get('/', (req, res) => {
  

    abcModel.baiviet()
        .then(row => {
            res.render('TrangChu', {
                Baiviet: row,
                layout: './index'
            })
        }).catch(err => {
            console.log(err);
            res.end('error occured!')
        })
});
router.get('/trangchu', (req, res) => {

    abcModel.baiviet()
        .then(row => {
            res.render('TrangChu', {
                Baiviet: row,
                layout: './index'
            })
        }).catch(err => {
            console.log(err);
            res.end('error occured!')
        })
});
router.get('/0', (req, res) => {

    abcModel.baiviet()
        .then(row => {
            res.render('TrangChu', {
                Baiviet: row,
                layout: './index'
            })
        }).catch(err => {
            console.log(err);
            res.end('error occured!')
        })
});

router.get('/:idCM', (req, res, next) => {
    var id = req.params.idCM;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        abcModel.baiviet(),
        abcModel.chude(id),
        abcModel.dsbaiviet(limit, offset),
        abcModel.countbaiviet(id),
        abcModel.dsbaikt(id),
        abcModel.loaibai(id)
    ]).then(([row, row2, row3, count_rows, row4, row5]) => {
        for (const c of res.locals.MucHoc) {
            if (c.idLoaiBai === +id) {
                c.isActive = true;
            }
        }

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
        }

        if (id == 0) {
            res.render('TrangChu', {
                Baiviet: row,
                layout: './index'
            })
        }
        if (id == 1 || id == 3 || id == 4 || id == 5) {
            res.render('user/introduction', {
                Chude: row2,
                layout: './index'
            })
        }
        if(id==7){
            res.render("user/testtrinhdo",{
                layout: './index'
            })
        }
        if (id == 8 || id == 9) {
            res.render("user/testlist",{
                DSbaitest: row4,
                Loaibai: row5,
                layout: './index'
            })
        }
        if (id == 10) {
            res.render("user/tips", {
                DSbaiviet: row3,
                pages,
                layout: './index'
            });
        }
    }).catch(next);
})

router.get('/:idCM/:idCD', (req, res, next) => {
    var id = req.params.idCM;
    var id2 = req.params.idCD;

    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        abcModel.baiviet(),
        abcModel.chude(id),
        abcModel.tuvung(id2),
        abcModel.nguphap(id2),
        abcModel.dsluyennghe(id2, limit, offset),
        abcModel.countdsbainghe(id2),
        abcModel.chitietbaiviet(id2, id),
        abcModel.baivietlienquan(id2),
        abcModel.baikt(id2)
    ]).then(([row, row2, row3, row4, row5, count_rows, row6, row7, row8]) => {
        for (const c of res.locals.MucHoc) {
            if (c.idLoaiBai === +id) {
                c.isActive = true;
            }
        }

        for (const d of row2) {
            if (d.idCDBaiHoc === +id2) {
                d.isSelected = true;
            }
        }

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
        }

        if (id == 0) {
            res.render('TrangChu', {
                Baiviet: row,
                layout: './index'
            })
        }
        if (id == 1) {
            res.render('user/vocabulary', {
                Chude: row2,
                Tuvung: row3,
                layout: './index'
            })
        }
        if (id == 3 || id == 4) {
            res.render('user/grammar', {
                Chude: row2,
                Nguphap: row4,
                layout: './index'
            })
        }
        if (id == 5) {
            res.render('user/listening-list', {
                Chude: row2,
                DSluyennghe: row5,
                pages,
                layout: './index'
            });
        }
        if ( id == 8 || id == 9) {
            res.render("user/test-detail", {
                Chitietbaikt: row8,
                layout: './index'
            });
        }
        if (id == 10) {
            res.render("user/detail-tip", {
                Chitiet: row6,
                lienquan: row7,
                layout: './index'
            });
        }
    }).catch(next);
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, email, info) => {
        if (err)
            return next(err);

        if (!email) {
            return res.render('/', {
                err_message: info.message,
            })
        }

        req.logIn(email, err => {
            if (err)
                return next(err);
            return res.redirect('/listening');
        });
    })(req, res, next);
})

router.get('/is-available', (req, res, next) => {

    router.post('/', (req, res, next) => {
        req.logOut();
        res.redirect('/login')
    })



    router.get('/is-available', (req, res, next) => {
        var email = req.query.email;
        userModel.getPassbyEmail(email).then(rows => {
            if (rows.length > 0) {
                return res.json(false);
            }
            return res.json(true);
        })
    })

    router.post('/', (req, res, next) => {
        var saltRounds = 10;
        var b = req.body;
        var hash = bcrypt.hashSync(req.body.pass, saltRounds);
        var dob = req.body.bdate;
        router.post('/register', (req, res, next) => {
            var saltRounds = 10;
            var nowDate = new Date();
            var hash = bcrypt.hashSync(req.body.pass, saltRounds);
            var dob = moment(req.body.bdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            var nowday = moment(nowDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            var entity = {
                hoten: req.body.HoTen,
                ngaysinh: dob,
                NgayTaoTK: nowday,
                matkhau: hash,
                email: req.body.email,
                phanhe: 2,
                Xoa: 0,
            }
            userModel.add(entity).then(id => {
                res.redirect('/');
            })

        })
    })
})


module.exports = router;