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


router.post('/', (req, res, next) => {
    req.logOut();
    res.redirect('/login')
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

router.post('/register', (req,res,next) =>{
    var saltRounds = 10;
    var nowDate = new Date();
    var hash = bcrypt.hashSync(req.body.pass, saltRounds) ;
    var dob =  moment(req.body.bdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
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
    userModel.add(entity).then(id =>{
        res.redirect('/');
    })
    
})


module.exports = router;