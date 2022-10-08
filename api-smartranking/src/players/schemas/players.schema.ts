import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  ranking: { type: String, required: true },
  rankingPosition: { type: Number, required: true },
  photoUrl: { type: String, required: true },
});
