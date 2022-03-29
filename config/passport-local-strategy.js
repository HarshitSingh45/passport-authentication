const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new localStrategy({
       usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email: email}, (err, user) => {
            if(err) { return done(err);}
            if(!user || password != user.password){
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function(User, done){
    return done(null, User.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, (err, user) => {
        if(err){ return done(err);}
        if(user){
            return done(null, user);
        }
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;