// model require only the mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema(
	{
		patientName: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true
		},
		relativeName: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true
		},
		patientAge: {
			type: Number,
			required: true,
			maxlength: 3,
			trim: true
		},
		patientGender: {
			type: String
		},
		relativeMobileNo: {
			type: Number,
			maxlength: 10
		},
		relativeAlternateNo: {
			type: Number,
			maxlength: 10
		},
		patientAddress: {
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
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('patient', patientSchema);
