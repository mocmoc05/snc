'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var cors = require('cors');

var User = require('../models/user');
var Room = require('../models/room');


router.get("/logged", (req, res) => {
	res.send(true)
})
// Login
router.post('/register', function (req, res, next) {
		var roleId="TEACHER";
		
		var credentials = { 'roleId': roleId, 'username': req.body.username, 'password': req.body.password, 'email': req.body.email, 'class': req.body.class, 'phone': req.body.phone, 'fullname': req.body.fullname };

		
	
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


// Register via username and password

//create room
router.post('/createroom', function (req, res, next) {

	var formData = {
		title: req.body.title,
		desc: req.body.desc,
		content: req.body.content,
		users: req.body.users,
		roomtype: req.body.roomtype
	};

	console.log(formData);

	if (!formData.title) {
		return res.json({ status: "ERROR", message: "Hay dien tên khóa học" })
	} else {

		// Check if the username already exists for non-social account
		Room.findOne({ title: new RegExp('^' + req.body.title + '$', 'i') }, function (err, room) {
			if (err) throw err;
			if (room) {
				return res.json({ exist: "OK", status: "ERROR", message: "Khóa học đã tồn tại" })
			} else {
				Room.create(formData, function (err, newRoom) {
					if (err) throw err;
					return res.json({
						status: "OK",
						message: 'Tạo khóa học thành công',
						data: newRoom
					})
				});
			}
		});
	}
});

// Rooms
router.get('/rooms', function (req, res, next) {
	Room.find(function (err, rooms) {
		if (err) throw err;
		res.send({
			data: rooms,
			status: "OK",
			message: `Có ${rooms.length} khóa học`
		});
	});
});
router.get('/room/:id', function (req, res, next) {
	var id=req.params.id;
	Room.findById(id, function (err, room) {
		if (err) throw err;
		res.send({
			data: room,
			status: "OK",
			message: `Tìm thấy khóa học`
		});
	});
});
router.post('/deleteroom', function (req, res, next) {
	let roomId = req.body.id;
	console.log('remove roomid:', roomId);
	Room.findById(roomId, function (err, room) {
		console.log('delete room', room);
		if (err) throw err;
		if (room) {
			Room.remove({_id: roomId}, function (err, data) {
				if (err) {
					res.send({
						data: err,
						status: "ERROR",
						message: `Xóa không thành công`
					});
				};
				res.send({
					data: data,
					status: "OK",
					message: `Xóa thành công`
				});
			})
		}
	});
});


//get user
router.get('/users', (req, res, next) => {
	var data = User.getAll(function (err, data) {
		if (err) {
			res.send({
				status: "ERROR",
				message: "Lỗi kết nối"
			});
		}
		res.send({
			status: "OK",
			data: data,
			message: `Có ${data.length}`
		});
	})
});

router.post('/deleteUser', function (req, res, next) {
	let id = req.body.id;
	console.log('remove user:', id);
	User.findById(id, function (err, user) {
		if (err) throw err;
		if (user) {
			User.remove(user, function (err, data) {
				if (err) {
					res.send({
						data: err,
						status: "ERROR",
						message: `Xóa không thành công`
					});
				};
				res.send({
					data: user,
					status: "OK",
					message: `Xóa thành công`
				});
			})
		}
	});
});

module.exports = router;