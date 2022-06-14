let express = require('express');

let router = new express.Router();

let controller = require("../controllers/todosCTR");

//  we want:
//  get summary of iteams,
//  get detaills of single iteam (by ID)
// create a new item, 
// update and item by ID, 
// delete an item 

// get a summary of items: 
router.get("/todos", controller.itemSummary);

//  get detaills of single iteam (by ID)
router.get("/todos/:id", controller.itemDetails);

// create a new item
router.post("/todos", controller.createItem);

// Update an item
router.put("/todos/:id", controller.updateItem);

// delete item
router.delete("/todos/:id", controller.deleteItem);


module.exports = router; 

