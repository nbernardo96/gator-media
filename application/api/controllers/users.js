// functionality of the login signup and user dashboard pages

const index = require('../model/index');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const passport = require('passport');
const media = require("../model/database");
const Image = media.images;
const messages = require('../model/message');

//getting data from database
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

//load the login page from view
exports.getLogin  = function(req, res, next) {
	res.render('login', {title: 'Hi'})
}

//perform the login in function
exports.login  = passport.authenticate('local', {
	successRedirect: "/",
	failureRedirect: "/users/login",
	failureFlash: true
})

//load the sign up page
exports.getRegister  = function(req, res, next) {
	res.render('register', {title: 'Hi'})
}

//register, sign up function
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

//load the sell/post page from view
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


//show the user dashboard with all the user's post and messages from others
exports.getDashboard = (req, res, next)=>{
	var message;
	messages.findAll({
		where:{
			recipient_id: req.user.id
		}
	}).then(result=>{
			message = result;
			Image.findAll({
				where:{
					user_id: req.user.id
				}
			}).then( results =>{
				let items = results
				for (let i = 0; i < items.length; i++){
					let currentItem = new Buffer(results[i].data).toString('base64');
					items[i].data = currentItem
					console.log(items[i].name)
				}

				res.render('dashboard', {
					item: items,
					user:req.user,
					message: message
				})
			})
	})


}
