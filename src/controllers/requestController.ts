import { AuthRequest } from "../middleware/authMiddleware";
import {Response} from 'express';
import * as requestService from '../services/requestService';
import { request } from "http";


export const addRequest= async (req:AuthRequest,res:Response)=>{
    try{
        const user=req.user;
        const data=req.body
        await requestService.addRequest(data,user);
        res.status(200).json({message:"Friend request sent"});



    }
    catch(erra:any){
        res.status(500).json({message:erra.message});
    }
}

export const acceptRequest = async (req:AuthRequest, res: Response)=>{
try{
    const data=req.body;
    const message=await requestService.acceptRequest(data);
    res.status(200).json({message:message});
}
catch(err:any){
    console.log(err.message);
    res.status(500).json({message:err.message});

}
}

export const viewReqeusts = async (req:AuthRequest, res: Response)=>{

    const user=req.user;
    try{
    const requests = await requestService.viewRequests(user);
    res.status(200).json({requests});
    }
    catch(error: any){
        res.status(500).json({message:error.message});
    }

}

