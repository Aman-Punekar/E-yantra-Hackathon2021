require('dotenv').config();
const express = require("express");
const app =express(); //express
const mongoose = require('mongoose'); //mongoose




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


//routes
const donorInfo = require('./routes/donorInfo');
const auth = require('./routes/auth');
const visitor = require('./routes/visitor');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin:'http://localhost:8000', credentials:true}))

app.use('/api/donor',donorInfo);
app.use('/api/auth',auth);
app.use('/api/visitor',visitor);


app.listen(8000, () => {
    console.log(`Server running on port 8000 🔥`);
    });

