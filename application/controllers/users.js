const index = require('../model/index');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const passport = require('passport');



var db  = mysql.createConnection({
	host: "database-2.cmsixqgn7o2m.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "123123123",
	port: 3306
});

exports.getLogin  = function(req, res, next) {
	res.render('login', {title: 'Hi'})
}

exports.login  = passport.authenticate('local', {
	successRedirect: "/",
	failureRedirect: "/users/login",
	failureFlash: true
})

exports.getRegister  = function(req, res, next) {
	res.render('register', {title: 'Hi'})
}

exports.register  = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		return index.create({
			email : req.body.email,
			password : hashedPassword
		}).then(index => {
			console.log("hi")
			res.redirect('/users/login')
		})
	} catch {
			console.log("hi1")
			res.redirect('/users/login')
	}
}
