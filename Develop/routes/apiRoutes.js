const fs = require('fs');
const dbJSON = require('../db/db.json')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    return res.json(dbJSON);
  });

  // Create New Characters - takes in JSON input
  app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  console.log(newNote);

  dbJSON.push(newNote);

  res.json(newNote);
  });
};
