'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();

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

app.use("/", router);

app.listen(3000);
console.log("server listening on port 3000");