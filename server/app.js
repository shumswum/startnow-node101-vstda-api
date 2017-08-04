const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const assert = require('assert');
const app = express();

// Using some of the needed packages
app.use(morgan("dev"));
app.use(bodyParser.json());

// Make an array that will store the posts
var postHolder = [];

// add your code here
app.get("/", function (req, res) {
    res.status(200).json({status: "ok"});
});


app.get("/api/TodoItems", function (req, res) {
    res.status(200).json(postHolder);
});

// im working on this to make a req.param to display that as the body
app.get("/api/TodoItems/:id", function(req, res) {
    if(postHolder.length > 0) {
        for(var i = 0; i < postHolder.length; i++) {
            if(req.params.id === postHolder[i].todoItem.toString()) {
                return res.status(200).json(postHolder[i]);
            }
        }
    } else {
        res.sendStatus(200);
    }
});

app.delete("/api/TodoItems/:id", function (req, res) {
    if(postHolder.length > 0) {
        for(var i = 0; i < postHolder.length; i++) {
            if(req.params.id === postHolder[i].todoItem.toString()) {
                var removed = postHolder.splice(i, 1);
                return res.status(200).json(removed);
            }
        }
    } else {
        res.sendStatus(200);
    }
});

app.post("/api/TodoItems", function (req, res) {  
    // uninitialized boolean variable to check whether id is in use
    var exists;

    //loop through the postHolder array to compare post id to existing ids
    for(var i = 0; i < postHolder.length; i++) {
        if(postHolder[i].todoItem === req.body.todoItem) {
            exists = true;
        }
    }

    // Figure out whether the post ID already exists
    if(exists) {
        res.status(400).send("Id already in use! Please try again.");
    } else {
        postHolder.push(req.body);
        res.status(201).json(req.body);
    }
    
});

app.put("/api/TodoItems", function (req, res) {
    var exists;
    var matchedIndex;

    for(var i = 0; i < postHolder.length; i++) {
        if(postHolder[i].todoItem === req.body.todoItem) {
            exists = true;
            matchedIndex = i;
            break;
        }
    }

    if(exists) {
        postHolder[matchedIndex] = Object.assign(postHolder[matchedIndex], req.body);
        res.status(200).json(postHolder[matchedIndex]);
    } else {
        postHolder.push(req.body);
        res.status(201).json(req.body);
    }
});

app.patch("/api/TodoItems", function(req, res) {
    var exists;
    var matchedIndex;

    for(var i = 0; i < postHolder.length; i++) {
        if(postHolder[i].todoItem === req.body.todoItem) {
            exists = true;
            matchedIndex = i;
            break;
        }
    }

    if(exists) {
        postHolder[matchedIndex] = Object.assign(postHolder[matchedIndex], req.body);
        res.status(200).json(postHolder[matchedIndex]);
    } else {
        res.status(404).send("Status Code: 404\nRequest parameter doesn't exist.");
    }
});

module.exports = app;
