'use strict';

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDB');

let mongoSchema = mongoose.Schema;
let userSchema = {
	"email": String,
	"password": String
};

module.exports = mongoose.model("userModel", userSchema);