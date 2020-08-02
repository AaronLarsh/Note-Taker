//specific folder for API routes
const fs = require('fs');
const path = require('path');
var express = require('express');
var app = express();

module.exports = function(app) {
    //reads db.json file
    let fileRead = fs.readFileSync("./db/db.json","utf8");
    //parse this file
    let notes = JSON.parse(fileRead);
    //route for showing json webpage of notes
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });
    //route for posting new notes
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let postID = (notes.length.toString())
        newNote.id = postID;
        notes.push(newNote);
        res.json(newNote);
        addNote();
    });
    
    //search by id in url
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });
        //route for deleting  notes
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        res.json(notes);
        addNote();
    });
    //fucntion for saving notes to db.json
    function addNote() {
        fs.writeFile('./db/db.json',JSON.stringify(notes),err => {
        if (err) throw err;
        return true;
        })
    };
};