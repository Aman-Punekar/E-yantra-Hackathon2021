require('dotenv').config();
const express = require("express");
const app =express(); //express
const mongoose = require('mongoose'); //mongoose



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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/donorInfo',donorInfo);

app.listen(8000, () => {
    console.log(`Server running on port 8000 🔥`);
    });

