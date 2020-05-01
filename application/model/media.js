const Sequelize = require('sequelize');
const db = require('../config/database');

const media = db.define('media_table', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	mediaName: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING
	},
	url: {
		type: Sequelize.STRING
	},
	createdAt: {
		allowNull: true,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: true,
		type: Sequelize.DATE
	},
	description:{
		allowNull: true,
		type: Sequelize.STRING
	},
	isFree:{
		allowNull: true,
		type: Sequelize.STRING
	},
	user_id:{
		allowNull: true,
		type: Sequelize.INTEGER
	},
	status:{
		allowNull: true,
		type: Sequelize.STRING
	}
},{
	tableName: 'media_table'
} )

module.exports =  media;
