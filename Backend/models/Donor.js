// model require only the mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true
	},
	age: {
		type: Number,
		required: true,
		maxlength: 3,
		trim: true
	},
	gender: {
		type: String
	},
	mobileNo: {
		type: Number,
		maxlength: 10,
		unique: true
	},
	alternateNo: {
		type: Number,
		maxlength: 10
	},
	address: {
		lane: {
			type: String,
			trim: true
		},
		city: {
			type: String,
			trim: true,
			required: true
		},
		district: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true,
			required: true
		},
		pinCode: {
			type: Number,
			required: true,
			maxlength: 6
		}
	},

	bloodGroup: {
		type: String,
		required: true
	},
	profile: {
		data: Buffer,
		contentType: String
	}
});

module.exports = mongoose.model('Donor1', donorSchema);
