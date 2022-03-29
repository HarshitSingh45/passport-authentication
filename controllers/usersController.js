const User = require('../models/users');

module.exports.signup = (req, res) => {
    if(req.isAuthenticated()){
        return res.render('home');
    }
    return res.render('signup')
}

module.exports.signin = (req, res) => {
    if(req.isAuthenticated()){
        return res.render('home');
    }
    return res.render('signin')
}

module.exports.createUser = (req, res) => {
    if(req.body.password != req.body.cpassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            console.log('Error in finding the user');
            return;
        }
        if(user){
            return res.render('signin',{
                title: 'Signin Page'
            });
        }
        else{
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, (err, user) => {
                if(err){ console.log('error in creating user ', err); return}
                return res.render('home', {
                    title: 'Home Page',
                    user
                });
            })
        }
        
    })
}

module.exports.createSession = (req, res) => {
    User.findOne({email: req.body.email}, (err, user)=>{
        if(user){
            if(req.body.password == user.password){
                res.cookie('user_id', user.id);
                return res.render('home', {
                    title: 'Home Page',
                    user
                })
            }else{
                return res.redirect('back');
            }
        }else{
            return res.redirect('/users/signup');
        }
    })
}