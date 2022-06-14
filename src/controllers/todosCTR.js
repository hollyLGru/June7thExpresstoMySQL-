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
    let sql = "select id, task, description, is_done from todos";
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
// what we want request to look like : 
// {
//     "task"  : "clean the car"
//     "description" : "use soap and water"
// }

let createItem = function(req, res){
    console.log("creating a new item");
    let input = req.body;
    // it will be like the task example above that will be typed on postman body 
    let task = input.task;
    let description = input.description;

    if(!task) // if task is falsey (if they do not include a task)
        {
            res.status(400).send("task is required");
            return;
        }

        // below is example of parameterized sql which avoids sql injections
        let sql = "insert into todos(task, description) values (?, ?)";
        let params = [task, description];

        db.query(sql, params, function(err, results){
            if(err){
                console.log("could not execute SQL insert ", err);
                res.sentStatus(500);
            } else {
                res.sendStatus(204); // we dont have anything to return but that lets client know that everything went according to plan
            }
        });


};


// function to update an item
let updateItem = function(req, res){
    console.log("we are updating an item");

    let id = req.params.id;
    // get the id from the path param
    let body = req.body;

    let task = body.task;
    let description = body.description;
    let isDone = body.is_done;

    //make sure the task (by ID) is in the body
    if(!task){
        res.status(400).send("task is required");
        return;
    } 

    // if isDone is not selected as true or false, client will get error message. 
    if(isDone != true && isDone != false){
        res.status(400).send("isDone must be either true or false");
        return;
    }

    let isDoneInt; 
    if (isDone == true){
        isDoneInt = 1;
    } else {
        isDoneInt = 0
    }
    // the code above is because mySQL does not have booleans but instead 0 and 1 


    let sql = "update todos set task = ?, description = ?, is_done = ? where id = ? ";
    let params = [task, description, isDoneInt, id];

    db.query(sql, params, function(err, results){
        if(err){
            console.log("couldnt execute updated SQL" , err);
            res.sendStatus(500); //this isnt client's fault so thats why we sent 500
        } else {
            res.sendStatus(204); //let client know everything went well but we dont have data to send back 
        }
    })

};

// deleting an item:
let deleteItem = function(req, res){
    console.log("we are deleting an item");
    let id = req.params.id;

    let sql = "delete from todos where id = ?"
    let params = [id]

    db.query(sql, params, function(err, results){
        if(err){
            console.log("failed to delete item with id " +id, err)
            res.sendStatus(500)
        } else {
            res.sendStatus(204) // nothing to send back, but everything went as planned
        }
    })

};

module.exports = {
    itemSummary,  itemDetails, updateItem, createItem, updateItem, deleteItem
}
// now we can use these function in other files 