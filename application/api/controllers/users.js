const index = require('../model/index');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const passport = require('passport');
const media = require('../model/media');
const messages = require('../model/message');


var db  = mysql.createConnection({
	host: "database-2.cmsixqgn7o2m.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "123123123",
	port: 3306
});

db.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});
db.query('SELECT DISTINCT categoryName FROM sys.categories_table', function (error, results, fields) {
	categories= results
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
			res.redirect('/users/login')
		})
	} catch {
			res.redirect('/users/login')
	}
}

exports.getSell = (req, res, next) =>{
	db.query('SELECT DISTINCT categoryName FROM sys.categories_table', function (error, results, fields) {
		categories= results
	});
	if (req.isAuthenticated()){
		res.render('sell', {
			username: req.user.email,
			categories: categories
		})
	} else {
		res.redirect('/users/login')
	}
}

exports.getDashboard = (req, res, next)=>{
	var message;
	messages.findAll({
		where:{
			recipient_id: req.user.id
		}
	}).then(result=>{
			message = result;
			media.findAll({
				where:{
					user_id: req.user.id
				}
			}).then( result =>{
				res.render('dashboard', {
					item: result,
					user:req.user,
					message: message
				})
			})
	})


}
