require('dotenv').config(); //dotenv package

const mongoose = require('mongoose'); //mongoose
const express = require("express");
const app =express(); //express
//middleware to parse incoming requests like email name etc 
const bodyParser = require("body-parser");
// handles header
const cookieParser = require('cookie-parser');
//cross origin resouces sharing (allows resricted domain of info from anywhere)
const cors = require('cors');

//My routes
//bringing routes from routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//process.env is from dotenv package12345671
//Db connection
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true, //in documentation
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB connected");
});
// .catch(
//     console.log("DB PROBLEM")
// );
// myfun.run().then().catch("this to catch errors")
// end to connection


//middlewares (in between)
app.use(bodyParser.json());
//helps to put the values in the cookiee or delete a value
app.use(cookieParser());
app.use(cors());

//Routes
//when somebody visits
app.use("/api",authRoutes);
//user routes
app.use("/api",userRoutes);
//const port = 8000;

const port = process.env.PORT || 8000;
//Lisiten to port.
app.listen(port, () => {
console.log(`Server running on port ${port} 🔥`);
});