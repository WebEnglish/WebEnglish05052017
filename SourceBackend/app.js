var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var moment = require('moment');
var hbs_sections = require('express-handlebars-sections')


var app = express();

require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(bodyParser());

app.engine('.hbs', exphbs({extname: '.hbs',
        helpers: {
        format: val => {
          return moment(val).format('L');
        },
        section: hbs_sections() 
  }}));

app.set('view engine', 'hbs');
app.use(require('./middlewares/auth-mdw'));
app.use(express.static(__dirname+'/public'));
app.use('/', require('./router/user-router/index'))
app.use('/admin', require('./router/admin-router/indexAdmin'))
app.use('/admin/taikhoan', require('./router/admin-router/QLTaiKhoan'))
app.use('/admin/tuvung', require('./router/admin-router/QLTuVung'))
app.use('/login', require('./router/user-router/login'))



app.listen(5517, () => {
    console.log('server is running at http://localhost:5517');
})