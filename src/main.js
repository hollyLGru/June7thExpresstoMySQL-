const express = require("express");

let app = express();

let dotenv = require("dotenv");
require('dotenv').config();
// lets us use ENV file after install : npm dotenv


const bodyParser = require("body-parser");
// allows us to use JSON 
app.use(bodyParser.json());

const todoRoutes = require("./routes/todosRoutes");
// connects router folder to express and above gets the route definitions
app.use(todoRoutes);


// const PORT = 8000; (we need to hide this in env file )
const PORT = process.env.PORT;
// This starts the express app and logs what port I am on
app.listen(PORT, function(){;;
    console.log("API SERVER STARTED ON PORT", PORT)
})