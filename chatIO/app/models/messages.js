'use strict';
var messageModel   = require('../database').models.message;
var User 		= require('../models/user');
var Room 		= require('../models/room');

var create = function (data, callback){
	var newMessage = new messageModel(data);
	newMessage.save(callback);
};

var find = function (data, callback){
	messageModel.find(data, callback);
}

var findOne = function (data, callback){
	messageModel.findOne(data, callback);
}

var findById = function (id, callback){
	messageModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	messageModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

var getMessageInRoom = (roomId, data, callback)=>{
	messageModel. find({ occupation: /host/ })
	.where('roomId', roomId)
	.sort('createdTime','desc')
	.exec(callback);
}
var getHistory = (emitter, receiver, callback)=>{
	messageModel.find({chattype: "S", $or:[{
		receiver: receiver,
		emitter: emitter
	}, {
		receiver: emitter,
		emitter:receiver
	}]
}, callback)}

var getHistoryGroup = (emitter, receiver,roomId, callback)=>{
	messageModel.find({chattype: "G",roomId:roomId,$or:[{
		receiver: [emitter,receiver],
		emitter: emitter,
	},{emitter:receiver}]
}, callback)}

module.exports = { 
	create, 
	find, 
	findOne, 
	findById,
	getMessageInRoom,
	findByIdAndUpdate,
	getHistory,
	getHistoryGroup
};