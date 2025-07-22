import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import { User } from '../models/User';

interface JwtPayload{
id: string;
}

export interface AuthRequest extends Request{
    user?: any
    file?: any
}

export const protect = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void>=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
            const newuser= await User.findOne({_id: decoded.id});
            if(!newuser)  res.status(401).json({message:"User not found"});
            req.user=newuser;
            console.log(newuser?.name);
            next();
        }
        catch( error: any){
            res.status(401).json({ message: 'Invalid token' })
            return
        }
    }
    else{
         res.status(401).json({message:"Header not found"})
         return 
    }
}