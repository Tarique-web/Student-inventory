const express = require('express');
const db = require("./config/db")
const body = require("body-parser");

const app = express();
const router = express.Router();
app.use(body.json())
app.use ( body.urlencoded ({ extended : true }));

app.use('/',router);


// base URLs
app.use("/register", require("./routes/registerRout"));
app.use("/login",require("./routes/loginRout"));
app.use("/student",require('./routes/studentRout'));
app.use('/admin',require('./routes/adminRout'));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})

// URL List

console.log("                                                                     ");

console.log("POST user login ..........." + "/login");

console.log("                                                                     ");

console.log("POST user register................/register" )

console.log("                                                                     ");
console.log("POST student............... /student" );
console.log("GET student............... /student/getAll" );

console.log("                                                                     ");
console.log("GET user student's profile.........../student/profile")
