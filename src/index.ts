import express from "express";
import { Request,Response } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute";
import gymRoute from "./routes/gymRoute";
import postRouter from "./routes/postRoute";
import requestRouter from "./routes/requestRoute";
import cors from 'cors';


dotenv.config();

const app=express();

app.use(cors({
  origin: 'http://localhost:5173', // must NOT be '*'
  credentials: true                // must be true if using withCredentials
}));
app.use(express.json());

app.get('/',async (req: Request, res: Response)=>{
    res.send("Hello")
})

app.use('/api/users',userRoute)
app.use('/api/gym',gymRoute)
app.use('/api/posts',postRouter)
app.use('/api/request',requestRouter);


mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () =>
      console.log('Server running')
    );
  })
  .catch((err) => console.error('Mongo error:', err));