import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  language: { type: String, default: 'en' },
  currency: { type: String, default: 'EUR' },
  dateFormat: { type: String, default: 'MM/DD/YYYY' },
  timeFormat: { type: String, default: '12h' },
  notificationsEnabled: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: true },
  reminderDaysBefore: { type: Number, default: 1 },
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
