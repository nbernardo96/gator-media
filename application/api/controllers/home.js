// functionality of the general home page

const index = require('../model/index');
const mysql = require('mysql');
const messages = require('../model/message');
const media = require("../model/database");
const Image = media.images;


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



//show the detail in each post
exports.showDetail = (req, res, next)  => {
    return Image.findOne({
     where: {id: req.params.media_id}
    }).then(media => {
     db.query('SELECT categoryName FROM sys.categories_table', function (error, results, fields) {
      categories= results
      let currentItem = new Buffer(media.data).toString('base64');
      media.data = currentItem;
      if (req.isAuthenticated()) {
       res.render('media', {
        media: media,
        user: req.user,
        category: categories
       })
      } else {
       res.render('media', {
        media: media,
        user: "",
        category: categories
       })
      }
     })}).catch(e => {
     console.log(e);
    })
   }

//send message to the post owner from the "buyer"
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


//post new post which will automatically show in admin page
exports.postMedia = (req, res, next) =>{
	db.query('SELECT MAX(id) as id FROM sys.media_table', function (error, results, fields) {
		increment = results[0].id+1;
	});
	return Image.create({
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




//for user to logout
exports.logout = (req, res, next) =>{
	req.logOut()
	res.redirect('/users/login')
}


//get the home page
exports.getIndex = (req, res, next)  => {
	db.query('SELECT * FROM sys.images', function (error, results, fields) {
		items= results
		for (let i = 0; i < items.length; i++){
			let currentItem = new Buffer(results[i].data).toString('base64');
			items[i].data = currentItem
		}
		console.log(items.name)
		db.query('SELECT categoryName FROM sys.categories_table', function (error, results, fields) {
			categories= results
			console.log(categories)
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
		});
	});


}
