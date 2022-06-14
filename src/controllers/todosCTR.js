let db = require("../model/db");
// we need:
//  function to return a summary of items on the response 
// function to return detail of single item (ID)
// function to create a new item
// function to update an item
// function to delete an item 

//  function to return a summary of items on the response :
let itemSummary = function(req, res){
    console.log("list/summary of items");
    let sql = "select id, task, is_done from todos";
    // this is what we want to retrieve from mySQL(beekeeper) to show on postman. 
    // this SQL statement is directly from beekeeper

    db.query(sql, function(err, results){
        if(err){
            console.log("could not execute query", err);
            // if there is an error and we couldnt return results, then that will log in console alone with error message
            res.sendStatus(400);
        } else {
            res.json(results);
            // if everything goes smoothly, the results will be sent 
        }
    });
     
};

// function to return detail of single item (ID)
let itemDetails = function(req, res){
    console.log("list details of an item by ID");

    let id = req.params.id;
    // so that when you type in the search bar the id #, this will assign what id you are searching for

    let sql = "select id, task, description, is_done from todos where id = ?";
    // this SQL statement is directly from beekeeper.
    // bad sql would be: let sql "select id, task, description, is_done from todos where id = ?" + id . DONT DO THIS!!!!!!
    let params = []; // params is taking the place of the ? 
    params.push(id); // id is because that is the params 
    
    db.query(sql, params, function(err, results){
        if(err) {
            console.log("failed to execute query:", err);
            res.sendStatus(500); 
            // we send 500 because it is our fault not the client's fault 
        } else {
            if(results.length == 1){
                res.json(results[0])
            } else if (results.length > 1) {
                console.log("found more than one results for ID " + id);
                res.sendStatus(500);
                // we send a 500 bc this is a server error 
            } else if (results.length == 0) {
                // this means clients sent an ID that doesnt exist 
                res.sendStatus(404);
                // 404 means NOT FOUND !!
            }
        }
    })
    
};

// function to create a new item
let createItem = function(req, res){
    console.log("creating a new item");
    res.sendStatus(204); 
};

// function to update an item
let updateItem = function(req, res){
    console.log("we are updating an item");
    res.sendStatus(204); 
};

// deleting an item:
let deleteItem = function(req, res){
    console.log("we are deleting an item");
    res.sendStatus(204); 
};

module.exports = {
    itemSummary,  itemDetails, updateItem, createItem, updateItem, deleteItem
}
// now we can use these function in other files 