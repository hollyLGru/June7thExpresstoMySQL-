let mysql = require("mysql");

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});
// this is all info necessary in MYSQL documentation
// Above tells us what database to connect to

connection.connect(); 
// this connects to database

connection.query("select now()", function(err, results){
    // first item in a callback is ERROR (ERR
    if(err){
        console.log("Error Occured. could not test the database connection", err)
    } else {
        console.log("connection test results", results)
    }
})
// this above is issuing a query to the database.
// If the query is good, the results will be printed, but if a connection isnt made, an error message will be printed 


module.exports = connection;
// exports the connection