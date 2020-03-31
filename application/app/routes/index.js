'use strict';
var mysql = require('mysql')
var bodyParser = require('body-parser')

module.exports = function(app) {
// Home route
	var index = require('../../app/controllers/index')
	var items
	var categories
//app.get('/', index.render);
	var db  = mysql.createConnection({
		host: "database-2.cglovhs6vx6l.us-east-1.rds.amazonaws.com",
		user: "admin",
		password: "123123123",
		port: 3306
	});
	db.connect(function(err) {
		if (err) {
			console.error('Database connection failed: ' + err.stack);
			return;
		} else {
			console.log('Connected to database.');
		}
	});
	db.query('SELECT * FROM sys.media_table', function (error, results, fields) {
		items= results
	});
	db.query('SELECT DISTINCT category FROM sys.media_table', function (error, results, fields) {
		categories= results
	});

	app.get('/', function(req, res, next){
		res.render('index', {
			item: items,
			category: categories,
			searchCate: "All categories",
			title: ""
		})
	})

	app.use(bodyParser.urlencoded({extended:true}))
	app.post('/', function(req, res, next){
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
	})
};
