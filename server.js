require('dotenv').config();
const express = require('express'), session = require('express-session'), cfg = require('./configs'), path = require('path'), usersController = require('./controllers/usersController'), spendingsController = require('./controllers/spendingsController'), appController = require('./controllers/appController'), dashController = require('./controllers/dashController');


let app = express();
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))


app.use('/fonts', express.static(path.join(__dirname, './frontend/assets/fonts')));
app.use('/assets/bs-icons', express.static(path.join(__dirname, './node_modules/bootstrap-icons/font')));
app.use('/css', express.static(path.join(__dirname, './frontend/assets/css')));
app.use('/css/bs', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
app.use('/js/bs', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/js/chartjs', express.static(path.join(__dirname, './node_modules/chart.js/dist/')));
app.use('/js/fullcalendar', express.static(path.join(__dirname, './node_modules/fullcalendar/')));
app.use('/api/users', usersController);
app.use('/api/spendings', spendingsController);
app.use('/dash', dashController);
app.use('/', appController);

app.listen(process.env.PORT)