const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  
  fs.readFile("../Develop/db/db.json","utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    app.get("/api/notes", function(req, res) {
      res.json(notes);
    });

    app.post("/api/notes", function(req, res) {
      console.log(req)
      let newNotes = req.body;
      notes.push(newNotes);
      res.json(newNotes);
      addNote();
    });


    app.get("/api/notes/:id", function(req,res) {
      res.json(notes[req.params.id]);
      console.log(req)
    });

    app.delete("/api/notes/:id", function(req, res) {
      notes.splice(req.params.id, 1);
      addNote();
      res.redirect('/notes');
    });
    
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    function addNote() {
      fs.writeFile("../Develop/db/db.json",JSON.stringify(notes),err => {
        if (err) throw err;
        return true;
      })
    };
  });
};

