import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users';
import tripRoutes from './routes/trips';
import activityRoutes from './routes/activities';
import noteRoutes from './routes/notes';
import settingsRoutes from './routes/settings';
import expensesRoutes from './routes/expenses';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Vervang dit door de URL van je frontend
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/expenses', expensesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoURI = 'mongodb+srv://rubenRedant:4B6XKz0EmLnSn8ZR@firstclustertravelplann.edbfpys.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Welkom bij de Travel Planner API!');
  });
  