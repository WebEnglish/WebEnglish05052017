var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var userModel = require('../../model/thanhvien.model')

router.get('/', (req,res)=>{
    res.render('TrangChu',{
        layout: './index'
    })

})

router.get('/vocabulary',(req,res) => {
    res.render('user/vocabulary',{
        layout: './index'
    })
})

router.get('/notSignin', (req,res)=>{
    res.render('user/not-signin-yet',{
        layout: './index1'
    })
})

router.get('/grammarBasic', (req,res)=>{
    res.render('user/grammarBasic',{
        layout: './index'
    })
})

router.get('/grammarAdvanced', (req,res)=>{
    res.render('user/grammarAdvanced',{
        layout: './index'
    })
})

router.get('/listening', (req,res)=>{
    res.render('user/listening',{
        layout: './index'
    })
})

router.get('/KiemTraTrinhDo', (req,res)=>{
    res.render('user/not-signin-yet',{
        layout: './index'
    })
})

router.get('/KiemTraCanBan', (req,res)=>{
    res.render('user/not-signin-yet',{
        layout: './index'
    })
})

router.get('/KiemTraNangCao', (req,res)=>{
    res.render('user/not-signin-yet',{
        layout: './index'
    })
})

router.post('/login', (req,res,next)=>{
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

router.get('/is-available',(req,res,next) =>{
    var email = req.query.email;
    userModel.getPassbyEmail(email).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }
        return res.json(true);
    })
})

router.post('/', (req,res,next) =>{
    var saltRounds = 10;
    var b = req.body;
    var hash = bcrypt.hashSync(req.body.pass, saltRounds) ;
    var dob = req.body.bdate;
    var entity = {
        hoten: req.body.HoTen,
        ngaysinh: dob,
        matkhau: hash,
        email: req.body.email,
        phanhe: 0
    }
    userModel.add(entity).then(id =>{
        res.redirect('/');
    })
    
})


module.exports = router;