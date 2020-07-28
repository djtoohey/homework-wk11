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
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Routes
// =============================================================

// Route that gets data from notes for the user
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// Route that posts data to the notes for the user
app.post("/api/notes", function (req, res) {
    // gets new note from user
    let newNote = req.body;
    newNote.id = notes.length + 1;
    // pushes to notes array
    notes.push(newNote);

    // return the new array to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
});

// Route that deletes the notes with the id the user requested
app.delete("/api/notes/:id", function (req, res) {
    let chosenNote = req.params.id;
    // for loop to remove note from notes array
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];

        if (note.id == chosenNote) {
            notes.splice(i, 1);

        }
    }

    // for loop to rearrange each note id to still be in order
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];

        note.id = i;
    }

    // return the new array to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

});

// Route that sends the user to the Notes Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/css/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/assets/css/styles.css'));
});

app.get('/js/index.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/assets/js/index.js'));
});

// Route that sends the user to the Home Page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}/`);
});