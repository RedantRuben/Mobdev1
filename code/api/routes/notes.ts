import express, { Request, Response } from 'express';
import Note from '../models/note';

const router = express.Router();

// Alle notities voor een specifieke trip ophalen
router.get('/:tripId', async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ tripId: req.params.tripId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Kan notities niet ophalen.' });
  }
});

// Notitie toevoegen
router.post('/:tripId', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const note = new Note({ tripId: req.params.tripId, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Kon notitie niet toevoegen.' });
  }
});

// Notitie bijwerken
router.put('/:noteId', async (req: Request, res: Response) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      { content: req.body.content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Notitie niet gevonden.' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Kon notitie niet bijwerken.'});
  }
});

// Notitie verwijderen
router.delete('/:noteId', async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) {
      return res.status(404).json({ message: 'Notitie niet gevonden.' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Kon notitie niet verwijderen.'});
  }
});

export default router;
