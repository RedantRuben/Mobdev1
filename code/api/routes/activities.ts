import express, { Request, Response } from 'express';
import Activity from '../models/activity';

const router = express.Router();

// Alle activiteiten voor een specifieke trip ophalen
router.get('/:tripId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ tripId: req.params.tripId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Kan activiteiten niet ophalen.' });
  }
});

// Activiteit toevoegen
router.post('/:tripId', async (req: Request, res: Response) => {
  try {
    const { name, type, date } = req.body;
    const activity = new Activity({ tripId: req.params.tripId, name, type, date });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Kon activiteit niet toevoegen.' });
  }
});

// Activiteit bijwerken
router.put('/:activityId', async (req: Request, res: Response) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      { name: req.body.name, type: req.body.type, date: req.body.date },
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activiteit niet gevonden.' });
    }
    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: 'Kon activiteit niet bijwerken.'});
  }
});

// Activiteit verwijderen
router.delete('/:activityId', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activiteit niet gevonden.' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Kon activiteit niet verwijderen.'});
  }
});

export default router;
