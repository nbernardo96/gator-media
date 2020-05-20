// functionality of the admin page (approve/decline)

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const mysql = require('mysql')
const media = require("../model/database");
const Image = media.images;

router.use(bodyParser.urlencoded({extended:true}));

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
let items;
db.query('SELECT * FROM sys.images WHERE status = "pending";' , function (error, results, fields) {
	items= results
});


//get all the pending post from the database
exports.getAdmin = (req, res, next) =>{
	db.query('SELECT * FROM sys.images WHERE status = "pending";' , function (error, results, fields) {
		items= results
		for (let i = 0; i < items.length; i++){
			let currentItem = new Buffer(results[i].data).toString('base64');
			items[i].data = currentItem
		}
		res.render('admindash', {
			pendingItems: items
		})
	});

}


// action of approving the pending posts from the admin dashboard
exports.approvePost = (req, res, next) =>{
	console.log("approved")
	console.log(req.body.buttonValue)
	return Image.findOne({
		where:{
			id: req.body.buttonValue
		}
	}).then( media => {
		media.update({
			status: "Approved"
		})
		res.redirect("/")
	}).catch(e => {
		console.log(e);
	});
}

//action of declining the pending post from the admin dashboard
exports.declinePost = (req, res, next) =>{
	console.log("decline")
	console.log(req.body.buttonValue)
	return Image.destroy({
		where:{
			id: req.body.buttonValue
		}
	}).then( _ => {
		res.redirect("/")
	}).catch(e => {
		console.log(e);
	});
}
