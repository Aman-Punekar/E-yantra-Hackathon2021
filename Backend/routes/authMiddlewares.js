require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const authenticateUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    jwt.verify(accessToken, JWT_AUTH_TOKEN, async(err, phone) => {
        if(phone){
            req.phone = phone;
            next();
        }else if(err.message === 'TokenExpiredError'){
            return res.status(403).send({success:false, msg:'Access Token Expired'});
        }else{
            console.error(err);
            res.status(403).send({err, msg:'User Not Authenticated'});
        }
    })
}

module.exports = {authenticateUser};