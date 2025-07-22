import mongoose, { Schema, Document } from 'mongoose';

export interface IGym extends Document {
_id: mongoose.Types.ObjectId; 
  name: string;
  area: string;
  city: string;
  coordinates?: {
    lat: number;
    long: number;
  };
}

const gymSchema = new Schema<IGym>({
    
  name: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  coordinates: {
    lat: Number,
    long: Number
  }
});

export const Gym = mongoose.model<IGym>('Gym', gymSchema);