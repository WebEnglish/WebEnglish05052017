var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')

var app = express();

require('./middlewares/passport')(app);
require('./middlewares/session')(app);
app.use(bodyParser());

app.engine('.hbs', exphbs({extname: '.hbs',
        helpers: {
        format: val => {
          return moment(val).subtract(10, 'days').calendar();
        }
  }}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));
app.use('/', require('./router/user-router/index'))

app.listen(5517, () => {
    console.log('server is running at http://localhost:5517');
})