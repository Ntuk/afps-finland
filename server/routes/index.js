
const express = require('express')
const app = express()
const session = require('express-session');
const db = require('../db');

const bodyParser = require('body-parser');
const keys = require('../keys');
const passport = require('passport');

const usersRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const opasRoutes = require('./opas');
const apiRoutes = require('./api');
const contactRoutes = require('./contact');
const productHeroRoutes = require('./product-hero');

require("../services/passport");

// connect to DB
db.connect();
const store = db.initSessionStore();

app.use(bodyParser.json());

// var csrf = require('csurf');
// consider using this

const sess =
  { name: 'promo-secure-session',
    secret: keys.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store
  }

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
  sess.cookie.httpOnly = true;
  sess.cookie.sameSite = None;
  sess.cookie.domain = process.env.DOMAIN // .yourdomain.com
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use('', apiRoutes);
app.use('/product-heroes', productHeroRoutes);
app.use('/users', usersRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/oppaat', opasRoutes);
app.use('/contacts', contactRoutes);



module.exports = {
  path: '/api/v1',
  handler: app
}
