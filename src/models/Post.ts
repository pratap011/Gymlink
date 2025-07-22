import mongoose, { Schema, Document } from 'mongoose';

export interface IComment {
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  mediaUrl?: string;
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema<IPost>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model<IPost>('Post', postSchema);


export default Post;