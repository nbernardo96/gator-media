const index = require('../model/index');
const mysql = require('mysql');
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
});
let increment = 0;
var items;
var categories;
db.query('SELECT MAX(id) as id FROM sys.media_table', function (error, results, fields) {
	increment = results[0].id+1;
});
db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
	items= results
});
db.query('SELECT DISTINCT category FROM sys.media_table', function (error, results, fields) {
	categories= results
});

exports.submitIndex = (req, res, next) =>{
	return index.create({
		email : req.body.user_email
	}).then(index => {
		res.redirect('/users')
	}).catch(e => {
		console.log(e);
	});
}

exports.showUsers = (req, res, next) =>{
	return index.findAll().then(users => {
		res.render('index', {title: 'Hi', users: users})
	}).catch(e => {
		console.log(e);
	});
}

exports.showUser = (req, res, next) =>{
	return index.findOne({
		where: {id: req.params.user_id}
	}).then(user => {
		res.render('user', {user: user})
	}).catch(e => {
		console.log(e);
	});
}

exports.showEdit = (req, res, next)  => {
	return index.findOne({
		where: {id: req.params.user_id}
	}).then(user => {
		res.render('edit', {user: user})
	}).catch(e => {
		console.log(e);
	});
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
	}).catch(e => {
		console.log(e);
	});
}

exports.showDetail = (req, res, next)  => {
	return media.findOne({
		where: {id: req.params.media_id}
	}).then(media => {
		if (req.isAuthenticated()) {
		res.render('media', {
			media: media,
			userID: req.user.name
		})
	} else {
			res.render('media', {
				media: media,
				userID: ""
			})
		}}).catch(e => {
		console.log(e);
	})
}

exports.contactOwner = (req, res, next) =>{
	db.query('SELECT MAX(message_id) as id FROM sys.messages_table', function (error, results, fields) {
		increment = results[0].id+1;
		console.log("send to owner")
		console.log(increment)
		console.log("content:" + req.body.sendContent)
		console.log("recipent:" + req.body.buttonValue)
		console.log("sender:" + req.user.id)
		return messages.create({
			message_id: increment,
			message: req.body.sendContent,
			recipient_id: req.body.buttonValue,
			sender_id: req.user.id
		}).then( _=>{
			res.redirect("/")
		})
	});

}

exports.postMedia = (req, res, next) =>{
	db.query('SELECT MAX(id) as id FROM sys.media_table', function (error, results, fields) {
		increment = results[0].id+1;
	});
	return media.create({
		id: increment,
		mediaName: req.body.media_name,
		description: req.body.description,
		isFree : req.body.isFree,
		user_id: req.user.id,
		category: req.body.category,
		status: "pending"
	}).then( _ =>{
		res.redirect('/')
	})
}


exports.deleteUser = (req, res, next)  => {
	return index.destroy({
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.redirect('/users')
	}).catch(e => {
		console.log(e);
	});
}

exports.deleteUserJson = (req, res, next)  => {
	return index.destroy({
		where: {
			id: req.params.user_id
		}
	}).then(result => {
		res.send({mes:"Success"});
	}).catch(e => {
		console.log(e);
	});
}

exports.logout = (req, res, next) =>{
	req.logOut()
	res.redirect('/users/login')
}



exports.getIndex = (req, res, next)  => {
	db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
		items= results
	});
	db.query('SELECT DISTINCT category FROM sys.media_table', function (error, results, fields) {
		categories= results
	});
	if (req.isAuthenticated()) {
		res.render('index', {
			user: req.user,
			item: items,
			category: categories,
			searchCate: "All categories",
			title: ""
		})
	} else {
		res.render('index', {
			user: "",
			item: items,
			category: categories,
			searchCate: "All categories",
			title: ""
		})
	}
}
