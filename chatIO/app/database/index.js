'use strict';

var config 		= require('../config');
var Mongoose 	= require('mongoose');
var logger 		= require('../logger');

// Connect to the database
// construct the database URI and encode username and password.
// var dbURI = "mongodb://" + 
// 			encodeURIComponent(config.db.username) + ":" + 
// 			encodeURIComponent(config.db.password) + "@" + 
// 			config.db.host + ":" + 
// 			config.db.port + "/" + 
// 			config.db.name;"mongodb://"+configValues.username+":"+configValues.password+"@ds143737.mlab.com:43737/nodetodoes_quyeths";
var dbURI = "mongodb://quyeths:hoanggiang@ds137246.mlab.com:37246/chatio";
Mongoose.connect(dbURI,{ useMongoClient: true }, function(err){
});

// mpromise (mongoose's default promise library) is deprecated, 
// Plug-in your own promise library instead.
// Use native promises
Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		user: require('./schemas/user.js'),
		role: require('./schemas/role.js'),
		room: require('./schemas/room.js'),
		message: require('./schemas/messages.js')
	}
};