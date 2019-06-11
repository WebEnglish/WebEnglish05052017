var categoryModel = require('../model/DSmuchoc.model');

module.exports = (req, res, next) => {
    Promise.all([
        categoryModel.menu(),
        categoryModel.dropdown()
    ])
        .then(([rows, rows2]) => { 
            var tmp=[];    
            for (const d of rows2) {
                res.locals.MucHoc = rows;
                for(const c of rows){
                    if (d.LBcha === +c.idLoaiBai) {
                        d.isDropdown2 = true;
                        c.isDropdown = true;
                        tmp.push(d);
                        res.locals.dropdowns = tmp;
                    }
                }
            }
           
            
            
            next();
        })
}