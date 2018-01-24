'use strict';
var Mongoose  = require('mongoose');

var MessageSchema = new Mongoose.Schema({
    roomId: { type: String, required: false },
    userId: { type: String, required: false },
    emitter:{ type: String, required: false },
    receiver:{ type: String, required: false },
    chattype:{ type: String, required: false },
    text:{ type: String, required: true },
    createdTime: {type: Date, required: false}
});

var messageModel = Mongoose.model('messages', MessageSchema);

module.exports = messageModel;