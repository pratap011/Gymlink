import { Gym } from '../models/Gym';
import {User} from '../models/User';
import Post from '../models/Post';

interface registerUserDTO{
    name: string;
    email: string;
    passwordHash: string
}

interface loginUserDTO{
    email: String;
    passwordHash: string
}

interface mapUserToGymDTO{
    gymName: string;
}

interface fetchUserProfileDTO{
    userId: string;
}

export const registerUser = async (userData: registerUserDTO)=>{
    const oldUser = await User.findOne({email: userData.email});
    if(oldUser){
        throw new Error('User already exists');
    }
    const newUser = new User(userData);
    return await newUser.save();
}

export const loginUser = async (userData: loginUserDTO)=>{
    const user= await User.findOne({email: userData.email});
    if(!user) throw new Error("User not found")
    if(user.passwordHash!==userData.passwordHash){
        throw new Error("Invalid credentials");
    }
    return user;
}

export const mapUserToGym = async (userData:mapUserToGymDTO,user:any):  Promise<string> =>{
    const gym = await Gym.findOne({name:userData.gymName});
    const updatedUser=await User.findByIdAndUpdate(
        user._id,
        {gymId:gym?._id},
        {new:true}
    )

    if(!updatedUser){
        throw new Error("Updation failed or user not found");
    }
    return `User ${updatedUser.name} mapped to gym ${gym?.name}`;


}

export const fetchUserProfile = async (userData:fetchUserProfileDTO)=>{
    const posts=await Post.find({userId:userData.userId});
    return posts;
}

export const fetchUserFeed = async (user: any) => {
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      throw new Error('User not found');
    }
  
    const friendIds = currentUser.friends || [];
    const allPosts: any[] = [];
  
    for (const friendId of friendIds) {
      // Step 1: Fetch posts for this friend
      const posts = await Post.find({ userId: friendId });
  
      // Step 2: Fetch friend's username
      const friend = await User.findById(friendId);
      const username = friend?.name || 'Unknown';
  
      // Step 3: Map posts to required format
      const filteredPosts = posts.map(post => ({
        username,
        content: post.content,
        mediaUrl: post.mediaUrl,
        likes: post.likes,
        comments: post.comments,
        createdAt: post.createdAt
      }));
  
      allPosts.push(...filteredPosts);
    }
  
    // Optional: Sort by createdAt (newest first)
    allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
    return allPosts;
  };
  