const Sequelize = require('sequelize');
const db = require('../config/database');

const messages = db.define('messages_table', {
	message_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	message: {
		type: Sequelize.STRING
	},
	recipient_id: {
		allowNull: false,
		type: Sequelize.INTEGER
	},
	sender_id: {
		allowNull: false,
		type: Sequelize.INTEGER
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE
	}
},{
	tableName: 'messages_table'
})

module.exports =  messages;
