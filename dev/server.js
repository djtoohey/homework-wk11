// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

// Set up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes (DATA)
// =============================================================
let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// Routes
// =============================================================

// Basic route that sends the user to the notesz
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// Basic route that sends the user to the Notes Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Basic route that sends the user to the Home Page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT + "/");
});