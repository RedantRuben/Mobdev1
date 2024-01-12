import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();
//registreren
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Gebruiker bestaat al.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ userId: user.id, email: user.email }, 'jouw_jwt_geheime_sleutel', { expiresIn: '1h' });

    res.status(201).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Iets ging mis bij het registreren.' });
  }
});

export default router;


//inlog
router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Gebruiker niet gevonden.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Ongeldig wachtwoord.' });
      }
  
      const token = jwt.sign({ userId: user.id, email: user.email }, 'jouw_jwt_geheime_sleutel', { expiresIn: '1h' });
  
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Inloggen mislukt.' });
    }
  });

