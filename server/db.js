const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
	process.env.DB_NAME, // Database name 
	process.env.DB_USER, // User 
	process.env.DB_PASSWORD, // Password
	{
		dialect: 'postgres',	
		logging: msg => {
			if (msg.startsWith('Executing (default)')) return;
			console.log(msg); 
		},	
		host: process.env.DB_HOST, 
		port: process.env.DB_PORT 	
	}
);