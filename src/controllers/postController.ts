import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import minioClient from '../Utils/minioClient';
import * as postService from '../services/postService';


export const handleCreatePost = async (req:AuthRequest, res: Response)=>{
    try{
        const file = req.file;
        const content = req.body;
        if(!file){
            return;
        }
    
        if(!file || !content){
            res.status(400).json({message:'Photo or caption cannot be empty!'});
        }
        const bucketName='gymposts';
        const fileName = `${Date.now()}-${file?.originalname}`;
        const bucketExists=await minioClient.bucketExists(bucketName)
    
        if(!bucketExists){
            await minioClient.makeBucket(bucketName);
        }
    
        await minioClient.putObject(bucketName,fileName,file?.buffer,file?.size,{
          'Content-Type': file.mimetype,
        });
    
    
        const imageUrl = `http://localhost:9000/${bucketName}/${fileName}`;
        console.log(imageUrl);
    
        const newPost = await postService.createPost({
            userId:req.user._id,
            content:content.content,
            mediaURL:imageUrl
        });
        
        res.status(201).json({ message: 'Post created', post:newPost});
    }
   catch(error:any){
    res.status(500).json({message:error.message});
   }

}

export const handleLikes = async (req:AuthRequest,res:Response)=>{
    try{
        const message = await postService.addLike(req);
        res.status(200).json({message:message});
    }
    catch(err:any){
        res.status(500).json({message:err.message});
    }
}