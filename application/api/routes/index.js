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
router.get('/', home.getIndex);
router.get('/users', home.showUsers);
router.get('/user/:user_id', home.showUser);
router.get('/user/:user_id/edit', home.showEdit);
router.post('/user/:user_id/edit', home.edit);
router.get('/media/:media_id', checkAuthenticated, home.showDetail);
router.post('/user/:user_id/delete', home.deleteUser);
router.post('/user/:user_id/delete-json', home.deleteUserJson);
router.delete('/logout', home.logout);


//search feature, just ignore this part
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

router.use(bodyParser.urlencoded({extended:true}));
router.post('/', function(req, res, next){
	var searchText = req.body.term;
	var searchCate = req.body.category;
	console.log(searchText, searchCate)
	if(req.body.term == null ||  req.body.term==""){
		res.render('index', {
			item: items,
			category: categories,
			searchCate: searchCate,
			title: ""
		})
	} else {
		db.query(`SELECT * FROM sys.media_table WHERE mediaName Like '%` + searchText + `%'`, function (error, results, fields) {
			console.log(results.length) //debug statement
			if (results.length == 0) {
				res.render('index', {
					item: items,
					category: categories,
					searchCate: "All categories",
					title: ""
				})
			} else {
				searchText = results[0].mediaName
				res.render('index', {
					item: results,
					category: categories,
					searchCate: searchCate,
					title: ""
				})
			}
		});
	}
});

module.exports = router;
