import express, { Request, Response } from 'express';
import Settings from '../models/settings';

const router = express.Router();

// Haal instellingen op voor een gebruiker
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne({ userId: req.params.userId });
    if (!settings) {
      return res.status(404).json({ message: 'Instellingen niet gevonden.' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Kon instellingen niet ophalen.'});
  }
});

// Update of maak instellingen voor een gebruiker
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Kon instellingen niet bijwerken.'});
  }
});

export default router;
