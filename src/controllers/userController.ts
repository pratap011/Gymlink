import { Request, Response} from 'express';
import * as userService from '../services/userService';
import { generateToken } from '../Utils/generateTokens';
import { AuthRequest } from '../middleware/authMiddleware';

export const registerUser = async (req: Request,res: Response)=>{
    try{
        const newUser = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User created', userId: newUser._id });
        
    }
    catch(e: any){
        res.status(400).json({message:e.message||"Registration failed"});
    }
}

export const loginUser= async (req: Request, res: Response)=>{
    try{
        const user = await userService.loginUser(req.body);
        const token = generateToken(user._id.toString());
        res.status(200).json({
            message:"Login successful",
            token
        });

    }
    catch(error:any){
        res.status(400).json({"message":error.message});
    }
}

export const mapUserToGym = async (req: AuthRequest, res:Response)=>{
    try{
        const result=await userService.mapUserToGym(req.body,req.user);
        res.status(200).json({data:result});
    }
    catch( err: any){
        res.status(500).json({data:err.message});
    }
}

export const fetchUserData = async (req: AuthRequest, res: Response)=>{
    try{
        const user= req.user;
        console.log(user.name);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            gym: user.gymId,
            createdAt: user.createdAt
          });
    }
    catch(error:any){
        res.status(500).json({message:error.message});
    }   
}

export const fetchUserProfile = async (req:AuthRequest,res: Response)=>{
try{
    const userData=req.user;
    console.log(userData);
    const posts = await userService.fetchUserProfile({userId: userData._id});
    res.status(200).json({message:"Profile fetched successfully",posts});
}
catch(err:any){
    res.status(500).json({message:err.message})
}
}

export const fetchUserFeed = async (req:AuthRequest, res: Response)=>{
    try{    
        const userData=req.user;
        console.log(userData);
        const posts = await userService.fetchUserFeed(userData);
        res.status(200).json({message:"Feed fetched successfully",posts});
        }
        catch(err:any){
            res.status(500).json({message:err.message})
            }
}