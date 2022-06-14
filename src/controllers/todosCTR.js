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
    res.sendStatus(204); 
};

// function to return detail of single item (ID)
let itemDetails = function(req, res){
    console.log("list details of an item by ID");
    res.sendStatus(204); 
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