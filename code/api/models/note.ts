import mongoose, { Schema } from 'mongoose';

const noteSchema = new mongoose.Schema({
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
