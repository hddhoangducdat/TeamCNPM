const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const handlebars = require('hbs');
const passport = require('passport');
const expressSession = require('express-session');
const flash = require('connect-flash');

const homePage = require('./routes/homePage');

const login = require("./routes/login");
const signup = require("./routes/signup");
const initPasspostMiddleware = require("./middlewares/passportMiddleware");

const cartPage = require("./routes/cartPage");
const categories = require("./routes/categories");
const product = require("./routes/product");


const app = express();
dotenv.config();

const dbUrl = 'mongodb+srv://hddhoangducdat:83400319a@black-hole-wz8hs.mongodb.net/BlackHoleShop?retryWrites=true&w=majority';

// view engine setup
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser('keyboard cat'));
app.use(expressSession({ cookie: { maxAge: 60000 }})); //60000ms ~ 60s
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Configuring Passport
app.use(expressSession({secret: process.env.SECRET_KEY}));
app.use(passport.initialize());
app.use(passport.session());
initPasspostMiddleware(passport);

const db = mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Db connected !');
  }
);


app.use('/', homePage);
app.use('/home', homePage);
app.use("/login", login(passport));
app.use("/signup", signup(passport));
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
app.use("/cart", cartPage);
app.use("/categories", categories);
app.use("/product", product);



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
