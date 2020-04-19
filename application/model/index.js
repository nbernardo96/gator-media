const Sequelize = require('sequelize');
const db = require('../config/database');

const index = db.define('users_table', {
	password: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
},{
	tableName: 'users_table'
})

module.exports =  index;
