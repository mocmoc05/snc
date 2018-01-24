'use strict';

var config = require('../config');
var redis = require('redis').createClient;
var adapter = require('socket.io-redis');

var Room = require('../models/room');

var User = require('../models/user');
var Message = require('../models/messages');
var messageModel   = require('../database').models.message;

/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
var ioEvents = function (io) {
	// Rooms namespace
	io.of('/rooms').on('connection', function (socket) {
		// console.log("Client connect :" + socket.id);
		socket.on("get-rooms", function(){
			let users=Room.find({}, function(err, data){
				if(err) throw err;
				socket.emit('send-rooms', data, true);
			});
		});
		// Create a new room
		socket.on('createRoom', function (title) {
			Room.findOne({ 'title': new RegExp('^' + title + '$', 'i') }, function (err, room) {
				if (err) throw err;
				if (room) {
					socket.emit('get-room-list', { error: 'Room title already exists.' });
				} else {
					Room.create({
						title: title
					}, function (err, newRoom) {
						if (err) throw err;
						socket.emit('get-room-list', newRoom);
						socket.broadcast.emit('get-room-list', newRoom);
					});
				}
			});
		});
	});

	var userOnline=[];
	io.of('/users').on('connection', function (socket) {
		console.log("Client connect :" + socket.id);
		// socket.on("get-users", function(){
		// 	let users=User.getAll(function(err, data){
		// 		if(err) throw err;
		// 		socket.emit('send-users', data, true);
		// 	});
		// });
		socket.on("send-username",function(data){
			console.log(data);
		})
	});

	// Chatroom namespace
	io.of('/chatroom').on('connection', function (socket) {
		// Join a chatroom
		socket.on('join', function (roomId) {
			Room.findById(roomId, function (err, room) {
				if (err) throw err;
				if (!room) {
					// Assuming that you already checked in router that chatroom exists
					// Then, if a room doesn't exist here, return an error to inform the client-side.
					socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
				} else {
					// Check if user exists in the session
					if (socket.request.session.passport == null) {
						return;
					}

					Room.addUser(room, socket, function (err, newRoom) {

						// Join the room channel
						socket.join(newRoom.id);

						Room.getUsers(newRoom, socket, function (err, users, cuntUserInRoom) {
							if (err) throw err;
							// Return list of all user connected to the room to the current user
							socket.emit('updateUsersList', users, true);

							// Return the current user to other connecting sockets in the room 
							// ONLY if the user wasn't connected already to the current room
							if (cuntUserInRoom === 1) {
								socket.broadcast.to(newRoom.id).emit('updateUsersList', users[users.length - 1]);
							}
						});
					});
				}
			});
		});

		// When a socket exits
		socket.on('disconnect', function () {

			// Check if user exists in the session
			if (socket.request.session.passport == null) {
				return;
			}

			// Find the room to which the socket is connected to, 
			// and remove the current user + socket from this room
			Room.removeUser(socket, function (err, room, userId, cuntUserInRoom) {
				if (err) throw err;

				// Leave the room channel
				socket.leave(room.id);

				// Return the user id ONLY if the user was connected to the current room using one socket
				// The user id will be then used to remove the user from users list on chatroom page
				if (cuntUserInRoom === 1) {
					socket.broadcast.to(room.id).emit('removeUser', userId);
				}
			});
		});

		// When a new message arrives
		socket.on('newMessage', function (roomId, message) {

			// No need to emit 'addMessage' to the current socket
			// As the new message will be added manually in 'main.js' file
			// socket.emit('addMessage', message);
			var data = {
				roomId: roomId,
				userId: message.username,
				createdTime:  Date.now(),
				text: message.content
			};
			Message.create(data, function (err, newMsg) {
				if (err) throw err;
				console.log(newMsg);
				socket.broadcast.to(roomId).emit('addMessage', newMsg);
			});

		});

	});
}

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
var init = function (app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var users =[];
	var sockets=[];
	var usersGroup = [];
	io.on('connection', function(socket){
		
	  	console.log(socket.id);
		  socket.on("send-username", function(data){
			console.log("data send nhan",data)
				socket.join(data)
				users.push({id:socket.id, username:data.username,fullname:data.fullname })
				var sks=[];
				Object.keys(io.sockets.sockets).forEach(function(id) {
						for (var i = 0; i < users.length; i++) {
							if(users[i].id == id){
								sks.push(users[i])
							}
						}
				})
				io.sockets.emit('get-user-online', sks)
		});
		//group
		socket.on("send-username-group", function(username){
			console.log("user name:",username);
			socket.join(username)
			usersGroup.push({id:socket.id, username:username })
			var sksGroup=[];
			Object.keys(io.sockets.sockets).forEach(function(id) {
					for (var i = 0; i < users.length; i++) {
						if(users[i].id == id){
							sksGroup.push(users[i])
						}
					}
			})
			console.log("sksGroup: ",sksGroup)
			io.sockets.emit('get-user-online-group', sksGroup)
		});
		//histoty message
		socket.on("get-history",function(data){
			var emitter=data.emitter;
			var receiver=data.receiver;
			//console.log("History", data);
			Message.getHistory(emitter, receiver, function(err, data){
				//console.log(data);
				socket.emit("send-history",data)
			})
			//console.log("wwww", data)
		})

		socket.on("send",function(data){
	
			var socketid= users.filter(x=>x.username==data.receiver);
			var message = data.message.message[0];

			console.log("data ng nhan",data.receiver);
			if(socketid.length>0){
				Message.create({
					emitter:data.emitter,
					receiver:data.receiver,
					chattype:"S",
					text: message.text,
					createdTime: Date.now()
				}, function(dt){
					//console.log(dt);
					
				});
				io.to(socketid[0].id).emit("msg",data.message)
			}
			
			console.log("wwww", data)
		})
		//group-message
		socket.on("get-history-group",function(data){
			var emitter=data.emitter;
			var receiver=[];
			var roomId=data.roomId
			data.receiver.forEach(function (obj) { receiver.push(obj.username) });
			console.log("History", roomId);
			Message.getHistoryGroup(emitter,receiver,roomId, function(err, data){
				//console.log(data);
				if(roomId){
					socket.emit("send-history-group",data)
				}
				
			})
			//console.log("wwww", data)
		})
		socket.on("send-group",function(data){
	
			var re = [];
			data.receiver.forEach(function (obj) { re.push(obj.username) });
			var roomId=data.roomId
			var message = data.message.message[0];

			console.log("gr re",roomId)
			//socket.broadcast.emit("msg-group",data.message)
			
			if(roomId){
				Message.create({
					emitter:data.emitter,
					receiver:re,
					roomId:roomId,
					chattype:"G",
					text: message.text,
					createdTime: Date.now()
				}, function(dt){
					//console.log(dt);
					
				});
				socket.broadcast.emit("msg-group",data.message)
			}
			
			console.log("wwww", data)
		})

		socket.on('log-out', function (username) {
			users.splice(username,1);
			socket.broadcast.emit("get-user-online", users);
		});
	});

	ioEvents(io);
	
	http.listen(3002, function(){
	  console.log('listening on *:3002');
	});
	
}

module.exports = init;