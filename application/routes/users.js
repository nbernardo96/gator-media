var express = require('express');
var router = express.Router();
var users = require('../controllers/users')

checkAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')
}
checkNotAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return res.redirect('/')
	}
	return next()
}

/* GET users listing. */
router.get('/login', users.getLogin);
router.post('/login', users.login);
router.get('/register',checkNotAuthenticated, users.getRegister);
router.post('/register',checkNotAuthenticated, users.register);




module.exports = router;
