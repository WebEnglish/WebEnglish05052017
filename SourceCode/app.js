var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var moment = require('moment');
var hbs_sections = require('express-handlebars-sections')

var app = express();
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./middlewares/locals.mdw'));

require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(bodyParser());

app.engine('.hbs', exphbs({extname: '.hbs',
        helpers: {
        format: val => {
          return moment(val).format('DD/MM/YYYY');
        },
        section: hbs_sections() 
  }}));
app.set('view engine', 'hbs');


app.use(require('./middlewares/auth-mdw'));
app.use(express.static(__dirname+'/public'));

app.use('/admin', require('./router/admin-router/indexAdmin'))
app.use('/admin', require('./router/admin-router/QLBaiViet'))
app.use('/admin/bainghe', require('./router/admin-router/QLBaiNghe'))
app.use('/admin/baikiemtra', require('./router/admin-router/QLBaiKiemTra'))
app.use('/admin/baiviet', require('./router/admin-router/QLBaiViet'))
app.use('/admin/taikhoan', require('./router/admin-router/QLTaiKhoan'))
app.use('/admin/tuvung', require('./router/admin-router/QLTuVung'))
app.use('/admin/nguphap', require('./router/admin-router/QLNguPhap'))
app.use('/login', require('./router/user-router/login'))

app.use('/', require('./router/user-router/index'))
app.use('/:idCM', require('./router/user-router/child'));
app.use('/:idCM/:idCD', require('./router/user-router/child'));


app.listen(5517, () => {
    console.log('server is running at http://localhost:5517');
})