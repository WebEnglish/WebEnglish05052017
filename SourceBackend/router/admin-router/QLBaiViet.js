var express = require('express');
var router = express.Router();
var baivietModel = require('../../model/BaiViet.model');

router.get("/baiviet",(req, res) => {
    baivietModel.list().
    then (row =>{
        var i=0;
        var stt=0;
        for (const c of row) {
            stt += 1;
            row[i].a = stt;
            i += 1;
        }
        res.render("admin/BaiViet/QLBaiViet",{
            List:row,
            layout: './indexAdmin'
        })
    }).catch();
})

router.get("/edit/:idBV", (req,res,next) =>{
    var id = req.params.idBV;

    baivietModel.chitiet(id)
    .then(row =>{
        res.render("admin/BaiViet/EditBaiViet",{
            detail: row,
            layout: './indexAdmin'
        })
    })
})

module.exports = router;