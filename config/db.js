const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('useCreateIndex', true);

//Students DB
mongoose.connect(
    "mongodb://localhost:27017/students", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log("Successfully Established Connection with MongoDB"))
    .catch(err => {
        console.log(`Failed to Establish Connection with MongoDB with Error: ${err.message}`);
    });
module.exports = mongoose;