var express = require('express');
var router = express.Router();

router.get('/vocabulary',(req,res) => {
    res.render('user/vocabulary',{
        layout: './index1'
    })
})

router.get('/notSignin', (req,res)=>{
    res.render('user/not-signin-yet',{
        layout: './index1'
    })
})

router.get('/grammarBasic', (req,res)=>{
    res.render('user/grammarBasic',{
        layout: './index1'
    })
})

router.get('/grammarAdvanced', (req,res)=>{
    res.render('user/grammarAdvanced',{
        layout: './index1'
    })
})

router.get('/listening', (req,res)=>{
    res.render('user/listening',{
        layout: './index1'
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


module.exports = router;