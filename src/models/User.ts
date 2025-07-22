import mongoose, {Schema, Document} from "mongoose";

export interface Iuser extends Document{
    _id: mongoose.Types.ObjectId; 
    name: string,
    email: string,
    passwordHash: string,
    gymId?: mongoose.Types.ObjectId;
    friends?: mongoose.Types.ObjectId[];
    profilePic?: string,
    createdAt: Date
}

const userSchema = new Schema<Iuser>(
    {
        name: {type: String, required: true },
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        gymId: {type: mongoose.Schema.ObjectId, ref: 'Gym'},
        friends: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
        profilePic: { type: String },
        createdAt: { type: Date, default: Date.now }


        }
    
)

export const User= mongoose.model<Iuser>('User', userSchema)