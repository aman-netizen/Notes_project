const express = require("express");
const router = express.Router();
const Notes = require("../models/notesModel");

router.post("/create", async (req, res) => {
  const { title, content } = req.body;

  const newNote = new Notes({ title, content });

  newNote.save()
    .then(savedNote => {
      res.status(201).json(savedNote);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/all-notes", async (req, res) => {
    Notes.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/update/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  Notes.findByIdAndUpdate(noteId, { title, content }, { new: true })
    .then((updatedNote) => {
      if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(updatedNote);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/delete/:id", async (req, res) => {
  const noteId = req.params.id;

  Notes.findByIdAndDelete(noteId)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
