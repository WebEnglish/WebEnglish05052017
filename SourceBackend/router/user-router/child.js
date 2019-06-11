var express = require('express');
var router = express.Router();
var abcModel = require('../../model/DSmuchoc.model');

router.get('/:idBH', (req, res) => {
    var id2 = req.params.idBH;
    for (const c of res.locals.MucHoc) {
        if (c.idLoaiBai === +5) {
            c.isActive = true;
        }
    }

    abcModel.bainghe(id2)
        .then(row => {
            res.render('user/listening', {
                Bainghe: row,
                layout: './index'
            })
        }).catch(err => {
            console.log(err);
            res.end('error occured!')
        })
});


module.exports = router;