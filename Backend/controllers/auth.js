require('dotenv').config();
const crypto = require('crypto'); // for encryption
const jwt = require('jsonwebtoken'); // issuing jwts
const donorCredentials = require("../models/donorCredentials");
const {genPasswordHash, validPassword} = require('../lib/utils');
const ACCOUNT_SID = 'ACe76bd995e206ab993cdbe06d22004e73';
const AUTH_TOKEN = '796ec1d88e088c5e177594f5e73ba789';
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); // configuring twilio

// environment variables
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;






/*
'/sendOTP' route: 
    this route takes the phone number from the body of the request. A random
6 digit otp is generated. The time limit for entering the otp is set as 4 minutes from the time otp being issued.
A string is created named data using phone, otp and expiry fields. The 'data' is hashed . Along with hash the expiry is 
appended creating fullhash.
    A json object containing the phone and fullhash is send to the client.

*/
const sendOtp = (req, res) => {

	const phoneTwilio = req.body.phone.toString(); + '+91'
	const phone = req.body.phone;
	const otp = Math.floor(100000 + Math.random() * 900000); // generating otp
	const ttl = 30 * 60 * 1000;
	const expires = Date.now() + ttl; // expiry time
	const data = `${phone}.${otp}.${expires}`;
	const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	const fullhash = `${hash}.${expires}`;

	// the following setup is the twilio configuration

	// client.messages
	// 	.create({
	// 		body: `your otp is ${otp}`,
	// 		from: '+14793455072',
	// 		to: phoneTwilio
	// 	})
	// 	.then((message) => console.log('Success'))
	// 	.catch((err) => console.log(err));

	res.status(200).send({
		phone,
		hash: fullhash,
		otp
	});
};

/*
/verifyOTP route: 
    In the request body a json object is received containing phone, hash and the otp entered by the user.
From the hash the hash and expiry field is extracted. Firstly, the expiry field is verified whether the time limit is not expired. 
If not, the otp is verified. Otherwise 504 status is sent stating that timeout has occured.
    The logic for otp verification is that a newHash is generated using the otp, phone and expiry fields. The newHash is 
compared with the hash from the request body. Being generated with the same fields and if not tampered with the newHash and
hash must match.
    On verifying the otp, the client is sent with the accessToken which will be used for further autherising the client
for other routes. Along with accessToken, refreshToken is also sent for keeping the user within the route on refreshing.
Otherwise 400 status is sent stating that otp is incorrect    

*/
const verifyOtp = (req, res) => {
	const phone = req.body.phone;
	const hash = req.body.hash;
	const otp = req.body.otp;
	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();

	if (now > parseInt(expires)) {
		return res.status(504).send({
			msg: 'timeout please try again'
		});
	}
	const data = `${phone}.${otp}.${expires}`;
	const newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

	if (newCalculatedHash === hashValue) {
		
		genPasswordHash(req.body.password, phone);

		const accessToken = jwt.sign(
			{
				data: phone
			},
			JWT_AUTH_TOKEN,
			{
				expiresIn: '1d'
			}
		);
		

		res
			.status(202)
			.cookie('accessToken', accessToken, {
				expires: new Date(new Date().getTime() + 86400 * 1000),
				sameSite: 'strict',
				httpOnly: true
			})
			
			.cookie('authSession', true, {
				expires: new Date(new Date().getTime() + 86400 * 1000),
				sameSite: 'strict'
			})
			
			.send({
				msg: 'Device verified'
			});
	} else {
		return res.status(400).send({
			verification: false,
			msg: 'Incorrect OTP'
		});
	}
};


const donorLogin = (req, res) => {

	donorCredentials.findOne({ mobileNo: req.body.phone })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: `There is no account of ${req.body.phone}` });
            }
            
            // Function defined at bottom of app.js
            const isValid = validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const accessToken = jwt.sign(
					{
						mobileNo: user.mobileNo,
						

					},
					JWT_AUTH_TOKEN,
					{
						expiresIn: '1d'
					}
				);

				res
					.status(202)
					.cookie('accessToken', accessToken, {
						expires: new Date(new Date().getTime() + 86400 * 1000),
						sameSite: 'strict',
						httpOnly: true
					})
					
					.cookie('authSession', true, {
						expires: new Date(new Date().getTime() + 86400 * 1000),
						sameSite: 'strict'
					})
					.send(user);

				
            } else {

                res.status(401).json({ success: false, msg: "Wrong Password" });

            }

        })
        .catch((err) => {
            res.status(400).send({err:err});
        });

}

const logout = (req, res) => {
	res.clearCookie('refreshToken').clearCookie('accessToken').clearCookie('authSession').clearCookie('refreshTokenID');
	
	res.json({
		message: 'User signed out successfully'
	});
};

module.exports = {
	sendOtp,
	verifyOtp,
	donorLogin,
	logout
};
