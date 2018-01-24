'use strict';

var Mongoose  = require('mongoose');

/**
 * Each connection object represents a user connected through a unique socket.
 * Each connection object composed of {userId + socketId}. Both of them together are unique.
 *
 */
var RoleSchema = new Mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true }
});

var roleModel = Mongoose.model('role', RoleSchema);

module.exports = roleModel;