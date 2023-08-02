const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const methodOverride =  require('method-override'); 
require('dotenv').config()
const cors = require("cors");

// app use created
const  app = express();

// view engine setup
app.set('views', path.resolve(__dirname , 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.PASSSESSION,
  resave: true,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(cors());

//routes views render
const views_public = require('./routes/router_views_public');
const views_user = require('./routes/router_user_profile');
const views_admin = require('./routes/router_user_admin');
const user_auth = require('./routes/router_users_auth');
const purchase = require('./routes/purchase.js')

//api routes
const api_users = require('./routes/api_users_router');
const api_mercado_pago = require('./routes/router_mercado_pago');
const api_products = require('./routes/api_products_router');
const api_cart = require('./routes/api_cart_router');
const api_info = require('./routes/api_info_router');
const api_purchases = require('./routes/api_purchases_router');
const api_feedback = require('./routes/api_feedback');

// ********** public and private routes *********//
app.use('/admin', views_admin);
app.use('/user', views_user);
app.use('/auth', user_auth);
app.use('/purchase', purchase);

// ********** API consumptions ****************//
app.use('/api/users', api_users);
app.use('/api/products', api_products);
app.use('/api/cart', api_cart);
app.use('/api/info', api_info);
app.use('/api/mp', api_mercado_pago);
app.use('/api/purchases', api_purchases);
app.use('/api/feedback', api_feedback);
app.use('/', views_public);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;