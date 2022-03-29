const express = require('express');
const port = 8000;

const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.urlencoded());

app.use(session({
    name: 'LoacalAuth',
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(db) 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'))

app.listen(port, err => {
    if(err){ console.log('error in running the server'); return};
    console.log(`Server is up and running on port: ${port}`);
})