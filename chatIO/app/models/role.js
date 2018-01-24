'use strict';

var roleModel   = require('../database').models.role;
var User 		= require('../models/user');

var create = function (data, callback){
	var newRole = new roleModel(data);
	newRole.save(callback);
};
var remove = function(id, callback){
	newRole.findById(id, callback).remove().exec();
}

var find = function (data, callback){
	newRole.find(data, callback);
}

var findOne = function (data, callback){
	newRole.findOne(data, callback);
}

var findById = function (id, callback){
	newRole.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	newRole.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	remove,
	find, 
	findOne, 
	findById
};