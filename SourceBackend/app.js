var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
var moment = require('moment');

var app = express();
var morgan = require('morgan');
var hbs_sections = require('express-handlebars-sections')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());


app.use(require('./middlewares/locals.mdw'));
require('./middlewares/passport')(app);
require('./middlewares/session')(app);
app.use(bodyParser());

app.engine('.hbs', exphbs({extname: '.hbs',
        helpers: {
        format: val => {
          return moment(val).format('L');
        },
        section: hbs_sections() 
  }}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));
app.use('/', require('./router/user-router/index'))
app.use('/:idCM', require('./router/user-router/child'));
app.use('/:idCM/:idCD', require('./router/user-router/child'));
app.get('/',(req,res)=>{
  res.render('trangchu');
})



app.listen(5517, () => {
    console.log('server is running at http://localhost:5517');
})