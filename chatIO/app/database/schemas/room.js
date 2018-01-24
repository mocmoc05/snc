'use strict';

var Mongoose  = require('mongoose');

/**
 * Each connection object represents a user connected through a unique socket.
 * Each connection object composed of {userId + socketId}. Both of them together are unique.
 *
 */
var RoomSchema = new Mongoose.Schema({
    title: { type: String, required: false },
    desc: {type: String, required: false},
    content: {type: String, required: false},
    connections: { type: [{ userId: String, socketId: String }]},
    users: {type:[], required: false},
    roomtype: {type: String, required: false},
});

var roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomModel;