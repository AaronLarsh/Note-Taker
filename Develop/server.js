// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
const fs = require("fs");
const path = require('path');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//routes

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);
let fileRead = fs.readFileSync("db/db.json","utf8");
let notes = JSON.parse(fileRead);

app.get("/api/notes", function(req, res) {
    res.json(notes);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let postID = (notes.length.toString())
    console.log(postID)
    newNote.id = postID;
    notes.push(newNote);
    res.json(newNote);
    console.log(notes)
    addNote();
});

app.get("/api/notes/:id", function(req,res) {
    res.json(notes[req.params.id]);
    console.log(req.params.id);
});

app.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    res.json(notes);
    addNote();
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

function addNote() {
    fs.writeFile("db/db.json",JSON.stringify(notes),err => {
    if (err) throw err;
    return true;
    })
};



// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
