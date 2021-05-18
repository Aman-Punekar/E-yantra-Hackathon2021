require('dotenv').config();


// environment variables
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;
const ACCOUNT_SID = 'ACe76bd995e206ab993cdbe06d22004e73';
const AUTH_TOKEN = '796ec1d88e088c5e177594f5e73ba789';
let refreshTokens = [];

/*
'/sendOTP' route: 
    this route takes the phone number from the body of the request. A random
6 digit otp is generated. The time limit for entering the otp is set as 4 minutes from the time otp being issued.
A string is created named data using phone, otp and expiry fields. The 'data' is hashed . Along with hash the expiry is 
appended creating fullhash.
    A json object containing the phone and fullhash is send to the client.

*/
const sendOtp = (req,res) => {
    
    
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random()*900000); // generating otp
    const ttl = 4*60*1000;
    const expires = Date.now() +ttl; // expiry time
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    const fullhash = `${hash}.${expires}`;

    
    // the following setup is the twilio configuration

    // client.messages
    // .create({
    //     body: `your otp is ${otp}`,
    //     from: '+14793455072',
    //     to: phone
    // })
    // .then((message) => console.log('Success'))
    // .catch((err) => console.log(err));

    res.status(200).send({phone, hash: fullhash, otp})
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
const verifyOtp  = (req,res) => {
    const phone = req.body.phone;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let [hashValue, expires] = hash.split('.');

    let now = Date.now();

    if(now > parseInt(expires)){
        return res.status(504).send({msg:'timeout please try again'});
    }
    const data = `${phone}.${otp}.${expires}`;
    const newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

    if (newCalculatedHash === hashValue){
        //return res.status(202).send({msg:'User confirmed'});

        
        const accessToken = jwt.sign({data:phone}, JWT_AUTH_TOKEN, {expiresIn: '30s'});
        const refreshToken = jwt.sign({data:phone}, JWT_REFRESH_TOKEN, {expiresIn: '1ys'});
        refreshTokens.push(refreshToken);


        res
			.status(202)
			.cookie('accessToken', accessToken, {
				expires: new Date(new Date().getTime() + 30 * 1000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('refreshToken', refreshToken, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict',
				httpOnly: true
			})
			.cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
			.cookie('refreshTokenID', true, {
				expires: new Date(new Date().getTime() + 31557600000),
				sameSite: 'strict'
			})
			.send({ msg: 'Device verified' });
    }else{
        return res.status(400).send({verification: false, msg: 'Incorrect OTP'})
    }
};

const refresh = (req,res,next)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(403).send({msg:'refresh token not found, please login again'});
    if(!refreshTokens.includes(refreshToken)) return res.status(403).send({msg:'refresh token blocked, please login again'});

    jwt.verify(refreshToken, JWT_REFRESH_TOKEN,(err, phone) => {
        if(!err){
            const accessToken = jwt.sign({data:phone}, JWT_AUTH_TOKEN, {expiresIn: '30s'});
            res
            .status(202)
            .cookie('accessToken', accessToken, {
                expires: new Date(new Date().getTime()+ 30*1000),
                sameSite: 'strict',
                httpOnly: true
            })
            .cookie('authSession', true, {
                expires: new Date(new Date().getTime()+ 30*1000),
                
            }).send({previousSessionExpiry:true, success:true});
        }else{
            return res.status(403).send({success:false, msg:'Invalid Refresh Token'});
        }
    })
    
};

const logout = (req, res)=>{
    res
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .clearCookie('authSession')
        .clearCookie('refreshTokenID')
        .send('User logged out')
};

module.exports = {sendOtp,verifyOtp,refresh,logout};