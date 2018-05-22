const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      dbRoutes = require('./routes/db'),
      authRoutes = require('./routes/auth')
      path = require('path');
 

// INITIAL SETUP
require('dotenv').config()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

// http://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

// API ROUTES
app.use('/api', dbRoutes);
app.use('/', authRoutes);

// LANDING PAGE
app.get('/', (req, res) => {
    res.render('index');
});

// SERVER SHIZZ
app.listen(3000, () => {
    console.log('Sever started on port 3000...');
});