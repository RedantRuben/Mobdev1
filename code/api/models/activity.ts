import mongoose, { Schema } from 'mongoose';

const activitySchema = new mongoose.Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  name: { type: String, required: true },
  type: { type: String },
  date: { type: Date },
  location: { type: String },
  details: { type: String },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
