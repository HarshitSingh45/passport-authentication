const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/usersController');

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create',  userController.createUser);
router.post('/createSession', passport.authenticate('local',{failureRedirect: '/users/signin'}) , userController.createSession);

module.exports = router;