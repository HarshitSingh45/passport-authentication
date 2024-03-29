const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/homeController');

router.get('/', passport.checkAuthentication , homeController.home);
router.use('/users', require('./users'));

module.exports = router;