var express = require('express');
var router = express.Router();
var NPModel = require('../../model/NguPhap.model')

router.get('/',(req,res)=>{
    NPModel.all().then(rows => {
        var dem = 0;
        var i = 0;
        for (const c of rows) {
            dem += 1;
            rows[i].stt = dem;
            i += 1;
        }
        res.render('admin/NguPhap/QLNguPhap',{
            dsCauTruc: rows,
            layout: './indexAdmin'
        })
    })
    
})

router.get('/chitiet/:id',(req,res)=>{
    var id = req.params.id;
    NPModel.getNPbyID(id).then(row =>{
        res.render('admin/NguPhap/EditNguPhap',{
            chitiet: row,
            layout: './indexAdmin'
        })
    })
})


router.post('/chinhsua',(req,res)=>{
    var temp = req.body;
    NPModel.getNPbyID(temp.ma).then(row =>{
        var entity = {
            idCauTruc: temp.ma,
            CDBaiHoc: row[0].CDBaiHoc,
            NoiDung: temp.NoiDung,
            NgayDang : temp.NgayDang,
            Xoa: 0            
        }
        var entity1 = {
            idCDBaiHoc: row[0].idCDBaiHoc,
            TenBai: temp.ChuDe,
            LoaiBai: row[0].LoaiBai
        }
        NPModel.updateCT(entity).then(id1 =>{
           
        });
        NPModel.updateCD(entity1).then(id2 =>{
                
        });

        res.redirect('/admin/nguphap');
        
    })
    
})
 

module.exports = router;