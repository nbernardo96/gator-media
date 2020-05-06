const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const index = require('./model/index');

var db = mysql.createConnection({
	host: "database-2.cmsixqgn7o2m.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "123123123",
	port: 3306
});

const validPassword = (password, user) => {
	return bcrypt.compareSync(password, user.password); // compare the bcrypted password to the real password (hash value)
}

function initialize(passport, getUserByEmail, getUserById) {

	const authenticateUser = (req, email, password, done) => {
		console.log(req.body.email, req.body.password)
		index.findOne({
			where: {email: req.body.email}
		}).then(user => {
			if (Object.keys(user).length === 0) {
				console.log(Object.keys(user).length)
				console.log('no user')
				//req.flash('message', 'Incorrect username')
				return done(null, false)
			} else if (req.body.password == null || req.body.password == undefined) {
				console.log('no password')
				//req.flash('message', 'no password')
				return done(null, false)
			} else if (!validPassword(req.body.password, user)) {
				console.log('password incorrect')
				//req.flash('message', 'no password')
				return done(null, false)
			} else{
				return done(null, user)
			}
		}).catch(e => {
			console.log(e)
		})

	}

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, authenticateUser))


	passport.serializeUser((user, done) => {
		return done(null, user)
	})
	passport.deserializeUser((user, done) => {
		return done(null, user)
	})
}

module.exports = initialize
