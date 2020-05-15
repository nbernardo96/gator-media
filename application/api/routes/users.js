//interface of the users.js from controller folder

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
router.get('/about', function(req, res, next){
res.render('about', {title: 'Hi'})
});
router.get('/about-ahmad', function(req, res, next){
res.render('about-ahmad', {title: 'Hi'})
});
router.get('/about-felipe', function(req, res, next){
res.render('about-felipe', {title: 'Hi'})
});
router.get('/about-nicole', function(req, res, next){
res.render('about-nicole', {title: 'Hi'})
});
router.get('/about-olivia', function(req, res, next){
res.render('about-olivia', {title: 'Hi'})
});
router.get('/about-pak', function(req, res, next){
res.render('about-pak', {title: 'Hi'})
});
router.get('/about-viral', function(req, res, next){
res.render('about-viral', {title: 'Hi'})
});
/* GET users listing. */
router.get('/login', users.getLogin);
router.post('/login', users.login);
router.get('/register',checkNotAuthenticated, users.getRegister);
router.post('/register',checkNotAuthenticated, users.register);
router.get('/register',checkNotAuthenticated, users.getRegister);
router.post('/register',checkNotAuthenticated, users.register);
router.get('/sell', users.getSell);
router.get('/dashboard', users.getDashboard);



module.exports = router;
