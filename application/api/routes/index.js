//interface of the home.js from controllers

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const home = require('../controllers/home')
const mysql = require('mysql')

//check if the user logged in base on the cookie
checkAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/users/login')
}
checkNotAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return res.redirect('/')
	}
	return next()
}
//--------------------------------------------


// interface of all function
// function implemented in controllers
router.get('/', home.getIndex); //get the home page
router.get('/media/:media_id', home.showDetail); //get the media detail
router.post('/media/contact',checkAuthenticated, home.contactOwner) //perform the action of sending message to the owner
router.post('/media/post', checkAuthenticated, home.postMedia); //perform the action of posting new media post
router.delete('/logout', home.logout); // logout function


//search feature, just ignore this part
var db  = mysql.createConnection({
	host: "database-2.cmsixqgn7o2m.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "123123123",
	port: 3306
});
db.connect(function(err) {
	if (err) throw err;
});
var items
var categories
//db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
// 		items= results;
//}
//db.query('SELECT DISTINCT categoryName FROM sys.categories_table', function (error, results, fields) {
// 			categories= results;
//}

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res, next){
	db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
		items= results;
		db.query('SELECT DISTINCT categoryName FROM sys.categories_table', function (error, results, fields) {
			categories= results;
			var searchText = req.body.term;
			var searchCate = req.body.category;
			console.log(searchText, searchCate)
			if(req.body.term == null ||  req.body.term==""){
				if (req.isAuthenticated()) {
					res.render('index', {
						user: req.user,
						item: items,
						category: categories,
						searchCate: searchCate,
						title: ""
					})
				} else {
					res.render('index', {
						user: "",
						item: items,
						category: categories,
						searchCate: searchCate,
						title: ""
					})
				}
			} else {
				db.query(`SELECT * FROM sys.media_table WHERE mediaName Like '%` + searchText + `%'`, function (error, results, fields) {
					console.log(results.length) //debug statement
					if (results.length == 0) {
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
								username: "",
								item: items,
								category: categories,
								searchCate: "All categories",
								title: ""
							})
						}
					} else {
						searchText = results[0].mediaName
						if (req.isAuthenticated()) {
							res.render('index', {
								user: req.user,
								item: results,
								category: categories,
								searchCate: searchCate,
								title: ""
							})
						} else {
							res.render('index', {
								user: "",
								item: results,
								category: categories,
								searchCate: searchCate,
								title: ""
							})
						}
					}
				});
			}
		});
	});
})
module.exports = router;
