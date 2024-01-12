import mongoose, { Schema } from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String },
  status: { type: String, default: 'gepland' },
  description: { type: String },
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;