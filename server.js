'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();

let userModel = require('./models/user-model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	"extended": false
}));

router.get("/", function(req, res) {
	res.json({
		"error": false,
		"message": "Hello World"
	});
})

router.route("/users")
	.get(function(req, res) {
		let response = {};
		userModel.find({}, function(err, data) {
			if (err) {
				response = {
					"error": true,
					"message": "Error fetching data"
				};
			} else {
				response = {
					"error": false,
					"message": data
				};
			}
			res.json(response);
		})
	})
	.post(function(req, res) {
		let user = new userModel();
		let response = {};

		user.email = req.body.email;
		user.password = req.body.password;

		user.save(function(err) {
			if (err) {
				response = {
					"error": true,
					"message": "Error addint user"
				};
			} else {
				response = {
					"error": false,
					"message": "User added"
				};
			}

			res.json(response);
		})
	});

router.route("/users/:id")
	.get(function(req, res) {
		let response = {};
		userModel.findById(req.params.id, function(err, data) {
			if (err) {
				response = {
					"error": true,
					"message": "Error fetching data"
				};
			} else {
				response = {
					"error": false,
					"message": data
				};
			}
			res.json(response);
		})
	})
	.put(function(req, res) {

		let response = {};

		userModel.findById(req.params.id, function(err, data) {
			if (err) {
				response = {
					"error": true,
					"message": "Error fetching data"
				};
			} else {
				if (req.body.email !== undefined) {
					data.email = req.body.email;
				}
				if (req.body.password !== undefined) {
					data.password = req.body.password;
				}
				data.save(function(err) {
					if (err) {
						response = {
							"error": true,
							"message": "Error updating data"
						};
					} else {
						response = {
							"error": false,
							"message": "Data is updated for " + req.params.id
						};
					}
					res.json(response);
				})
			}
		})
	})
	.delete(function(req, res) {

		let response = {};

		userModel.findById(req.params.id, function(err, data) {
			if (err) {
				response = {
					"error": true,
					"message": "Error fetching data"
				};
			} else {
				userModel.remove({
					_id: req.params.id
				}, function(err) {
					if (err) {
						response = {
							"error": true,
							"message": "Error removing user"
						};
					} else {
						response = {
							"error": false,
							"message": "User with ID " + req.params.id + "is deleted"
						};
					}
					res.json(response);
				})
			}
		})
	});

app.use("/", router);

app.listen(3000);
console.log("server listening on port 3000");