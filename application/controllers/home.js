const index = require('../model/index');
const mysql = require('mysql');
const media = require('../model/media')



exports.submitIndex = (req, res, next) =>{
	return index.create({
		email : req.body.user_email
	}).then(index => {
		res.redirect('/users')
	})
}

exports.showUsers = (req, res, next) =>{
	return index.findAll().then(users => {
		res.render('index', {title: 'Hi', users: users})
	})
}

exports.showUser = (req, res, next) =>{
	return index.findOne({
		where: {id: req.params.user_id}
	}).then(user => {
		res.render('user', {user: user})
	})
}

exports.showEdit = (req, res, next)  => {
	return index.findOne({
		where: {id: req.params.user_id}
	}).then(user => {
		res.render('edit', {user: user})
	})
}

exports.edit = (req, res, next)  => {
	return index.update({
		email: req.body.user_email
	}, {
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.redirect('/user/' + req.params.user_id)
	})
}

exports.showDetail = (req, res, next)  => {
	return media.findOne({
		where: {id: req.params.media_id}
	}).then(media => {
		res.render('media', {media: media})
	})
}


exports.deleteUser = (req, res, next)  => {
	return index.destroy({
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.redirect('/users')
	})
}

exports.deleteUserJson = (req, res, next)  => {
	return index.destroy({
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.send({mes:"Success"});
	})
}

exports.logout = (req, res, next) =>{
	req.logOut()
	res.redirect('/users/login')
}




var items;
var categories;
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
db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
	items= results
});
db.query('SELECT DISTINCT category FROM sys.media_table', function (error, results, fields) {
	categories= results
});

exports.getIndex = (req, res, next)  => {
	res.render('index', {
		item: items,
		category: categories,
		searchCate: "All categories",
		title: ""
	})
}
