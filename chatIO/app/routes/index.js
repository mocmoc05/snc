'use strict';

var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

var User = require('../models/user');
var Room = require('../models/room');

// Home page
router.get('/', function(req, res, next) {
	// If user is already logged in, then redirect to rooms page
	if(req.isAuthenticated()){
		res.redirect('/rooms');
	}
	else{
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0]
		});
	}
});
router.get('/room/users', function (req, res, next) {
	// If user is already logged in, then redirect to rooms page
	Room.getUserByRoomId(req.query.roomId, function(users){
		res.send(users);
	})
});

router.get('/user-rooms', function (req, res, next) {
	// If user is already logged in, then redirect to rooms page
	Room.getUserByUsername(req.query.username, function(rooms){
		res.send({
			status:"OK",
			data:rooms,
		});
	})
});
// Login
router.post('/login', (req, res, next) => {
	return passport.authenticate('local', (err, userData) => {
		console.log('login data', userData);
		if (err) {
			return res.status(400).json({
				status: "ERROR",
				message: err.message
			});
		}
		if (userData) {
			return res.json({
				status: "OK",
				message: 'Đăng nhập thành công',
				data: userData
			});
		}
		else {
			return res.status(400).json({
				status: "ERROR",
				message: "Tên tài khoản hoặc mật khẩu không đúng"
			});
		}

	})(req, res, next);
});

// Register via username and password
router.post('/register', function (req, res, next) {
	
		var credentials = { 'roleId': req.body.roleId, 'username': req.body.username, 'password': req.body.password, 'email': req.body.email, 'class': req.body.class, 'phone': req.body.phone, 'fullname': req.body.fullname };
	
		if (credentials.username === '' || credentials.password === '') {
			return res.json({ message: "Hay dien tai khoan" })
		} else {
	
			// Check if the username already exists for non-social account
			User.findOne({ 'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null }, function (err, user) {
				if (err) throw err;
				if (user) {
					return res.json({ exist: "OK", status: "ERROR", message: "Tai khoan da ton tai" })
				} else {
					User.create(credentials, function (err, newUser) {
						if (err) throw err;
						req.flash('success', 'Your account has been created. Please log in.');
						// res.redirect('/');
						return res.json({
							status: "OK",
							message: 'Đăng ky thành công',
							data: newUser
						})
					});
				}
			});
		}
	});

// Social Authentication routes
// 1. Login via Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/rooms',
		failureRedirect: '/',
		failureFlash: true
}));

// 2. Login via Twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/rooms',
		failureRedirect: '/',
		failureFlash: true
}));

// Rooms
router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
	Room.find(function(err, rooms){
		if(err) throw err;
		res.render('rooms', { rooms });
	});
}]);

// Chat Room 
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
	var roomId = req.params.id;
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
		}
		res.render('chatroom', { user: req.user, room: room });
	});
	
}]);
//get user
router.get('/users', (req, res, next)=>{
	var data=User.getAll(function(err, data){
		if(err){
			res.send({
				status: "ERROR",
				message: "Lỗi kết nối"
			});
		}
		res.send(
			{status: "OK",
			data: data,
			message: `Có ${data.length}`}
		);
	})
});
//Create Room
router.post("/create-room",function(req,res){
	var room={title:req.body.title,users:req.body.userGroup,roomtype:req.body.roomtype};
	console.log("roooooooom",room)
	Room.create(room,function(err,data){
		console.log(data)
		res.send(
			{
				status:"OK",
				data:data,
				message:"tao nhom thanh cong"
			}
		)
	})
})
// Logout
router.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();

	// destroy session data
	req.session = null;

	// redirect to homepage
	res.redirect('/');
});

module.exports = router;