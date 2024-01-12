import express, { Request, Response } from 'express';
import Expense from '../models/expense';

const router = express.Router();

// Haal alle uitgaven voor een trip op
router.get('/trip/:tripId', async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ tripId: req.params.tripId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Kon uitgaven niet ophalen.'});
  }
});

// Voeg een nieuwe uitgave toe
router.post('/', async (req: Request, res: Response) => {
  try {
    const { tripId, userId, description, amount, date } = req.body;
    const expense = new Expense({ tripId, userId, description, amount, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Kon uitgave niet toevoegen.'});
  }
});

// Update een uitgave
router.put('/:expenseId', async (req: Request, res: Response) => {
    try {
      const expense = await Expense.findByIdAndUpdate(
        req.params.expenseId,
        req.body,
        { new: true }
      );
  
      if (!expense) {
        return res.status(404).json({ message: 'Uitgave niet gevonden.' });
      }
  
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: 'Kon uitgave niet bijwerken.'});
    }
  });
  
// Verwijder een uitgave
router.delete('/:expenseId', async (req: Request, res: Response) => {
    try {
      const expense = await Expense.findByIdAndDelete(req.params.expenseId);
  
      if (!expense) {
        return res.status(404).json({ message: 'Uitgave niet gevonden.' });
      }
  
      res.json({ message: 'Uitgave verwijderd.' });
    } catch (error) {
      res.status(500).json({ message: 'Kon uitgave niet verwijderen.'});
    }
  });
  

export default router;
