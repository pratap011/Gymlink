import { Request, Response} from 'express';
import * as gymService from '../services/gymService';


export const addGymData = async (req: Request,res:Response)=>{
    try{
        const result = await gymService.addGym(req.body);
        res.status(201).json({message:result})
    }
    catch(err: any){
        res.status(400).json({message:err.message});
    }
}

export const fetchGymData=async (req: Request, res: Response)=>{
    try{
        const gymData=await gymService.fetchGymData(req.body);
        res.status(200).json({data:gymData});
    }
    catch(err:any){
        res.status(500).json({message:err.message});
    }
}

export const listGyms = async (req: Request, res: Response)=>{
    try{
        const cityname=req.query.city as string;
        const gymData=await gymService.listGyms({city:cityname});
        res.status(200).json({data:gymData});

    }
    catch(err:any){
        res.status(500).json({message:err.message});
        }

}

