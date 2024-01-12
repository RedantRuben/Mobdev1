import express, { Request, Response } from 'express';
import Trip from '../models/trip';

const router = express.Router();

// Alle trips ophalen
router.get('/', async (req: Request, res: Response) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Kan trips niet ophalen.' });
  }
});

// Trip details ophalen
router.get('/:tripId', async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip niet gevonden.' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Kan trip details niet ophalen.' });
  }
});

// Nieuwe trip creëren
router.post('/', async (req: Request, res: Response) => {
    try {
      const { userId, destination, startDate, endDate } = req.body;
      const trip = new Trip({ userId, destination, startDate, endDate });
      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Kon trip niet creëren.'});
    }
  });
  

// Trip bijwerken
router.put('/:tripId', async (req: Request, res: Response) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.tripId, req.body, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Kon trip niet bijwerken.' });
  }
});

// Trip verwijderen
router.delete('/:tripId', async (req: Request, res: Response) => {
    try {
      const result = await Trip.findOneAndDelete({ _id: req.params.tripId });
      if (!result) {
        return res.status(404).json({ message: 'Trip niet gevonden.' });
      }
      res.json({ message: 'Trip verwijderd.' });
    } catch (error) {
      res.status(500).json({ message: 'Kon trip niet verwijderen.' });
    }
  });
  

export default router;
