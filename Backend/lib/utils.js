const donorCredentials = require("../models/donorCredentials");
const crypto = require('crypto');

function genPasswordHash(password,phone) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    const newCredentials = new donorCredentials({
		mobileNo : phone,
		salt : salt,
		hash : genHash

	});

	newCredentials.save()
       .then((credentials) => {
           console.log(credentials);
           return;
       })
       .catch((err) => {
        console.log(err);
        res.status(400).send({
            err:err,
			msg : 'Could not save credentials due to some error'
          });
       })
}

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports = {genPasswordHash, validPassword};