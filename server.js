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
	});

app.use("/", router);

app.listen(3000);
console.log("server listening on port 3000");