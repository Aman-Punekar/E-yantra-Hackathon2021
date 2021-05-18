require('dotenv').config();
const express = require("express");
const app =express(); //express
const mongoose = require('mongoose'); //mongoose



const ACCOUNT_SID = 'ACe76bd995e206ab993cdbe06d22004e73';
const AUTH_TOKEN = '796ec1d88e088c5e177594f5e73ba789';
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN); // configuring twilio
const cors = require('cors');
const cookieParser = require('cookie-parser');



const db = process.env.DATABASE;

// connecting to the server
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connection Succesful');
}).catch((err) => console.log('no connection'));

const donorInfo = require('./routes/donorInfo');
const auth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin:'http://localhost:8000', credentials:true}))

app.use('/api/donorInfo',donorInfo);
app.use('/api/auth',auth);

app.listen(8000, () => {
    console.log(`Server running on port 8000 🔥`);
    });

