var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();


app.engine('.hbs', exphbs({extname: '.hbs',
        helpers: {
        format: val => {
          return moment(val).subtract(10, 'days').calendar();
        }
  }}));

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));
app.use('/', require('./router/user-router/vocabularyUser'))

app.get('/', (req, res) => {
    res.render('TrangChu',{
        layout: './index'
    })
})


app.listen(5517, () => {
    console.log('server is running at http://localhost:5517');
})