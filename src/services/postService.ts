import mongoose from 'mongoose';
import Post from '../models/Post';

export const createPost = async ({
    userId,
    content,
    mediaURL,
  }: {
    userId: string;
    content: string;
    mediaURL: string;
  })=>{
    const newPost = new Post({userId:userId, content:content, mediaUrl:mediaURL});
    return await newPost.save();

}

export const addLike = async(body:any)=>{
    const post = await Post.findById(body.body.postId);
    if(!post){
        throw new Error("Post not found!");
    }
    const userId= new mongoose.Types.ObjectId(body.body.userId);

    if(post.likes.includes(userId)){
        return {message:"Already liked"};
    }
    post.likes.push(userId);
    await post.save();
    return {message:"Post is liked!",likesCount:post.likes.length};
}