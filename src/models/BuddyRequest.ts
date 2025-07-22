import mongoose, { Schema, Document } from 'mongoose';

export interface IBuddyRequest extends Document {
  _id: mongoose.Types.ObjectId; 
  fromUser: mongoose.Types.ObjectId;
  toUser: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const buddyRequestSchema = new Schema<IBuddyRequest>({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export const BuddyRequest = mongoose.model<IBuddyRequest>('BuddyRequest', buddyRequestSchema);
