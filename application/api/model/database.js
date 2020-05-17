//config of the basic datebase setup

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sys', 'admin', '123123123', {
	host: 'database-2.cmsixqgn7o2m.us-east-2.rds.amazonaws.com',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	// SQLite only
	storage: 'path/to/database.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("../model/image.model")(sequelize, Sequelize);

module.exports = db;

