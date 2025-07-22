import mongoose from 'mongoose';
import { BuddyRequest } from '../models/BuddyRequest';
import { User } from '../models/User';

interface RequestDataDTO {
  fromUser: string;
}

interface AcceptRequestDTO {
    requestId: string;
  }


export const addRequest = async (requestData: RequestDataDTO, data: any) => {
  const fromUserId = new mongoose.Types.ObjectId(requestData.fromUser);
  const toUserId = new mongoose.Types.ObjectId(data._id);


  if (fromUserId.equals(toUserId)) {
    throw new Error('You cannot send a buddy request to yourself.');
  }

  const toUser = await User.findById(toUserId);
  if (!toUser) throw new Error('Receiving user not found.');

  if (toUser.friends?.includes(fromUserId)) {
    throw new Error('User is already in your friends list.');
  }

 
  const existingRequest = await BuddyRequest.findOne({
    $or: [
      { fromUser: fromUserId, toUser: toUserId },
      { fromUser: toUserId, toUser: fromUserId },
    ],
  });

  if (existingRequest) {
    throw new Error('Buddy request already exists between these users.');
  }

  const newRequest = new BuddyRequest({
    fromUser: fromUserId,
    toUser: toUserId,
  });

  await newRequest.save();
  return { message: 'Buddy request sent.' };
};

export const acceptRequest = async (
    requestData: AcceptRequestDTO
  ) => {
    const request = await BuddyRequest.findById(requestData.requestId);
    if (!request) throw new Error('Buddy request not found');
  
    const fromUserId = request.fromUser;
    const toUserId = request.toUser;
  
    // Add each user to the other's friends list
    await User.findByIdAndUpdate(fromUserId, {
      $addToSet: { friends: toUserId },
    });
  
    await User.findByIdAndUpdate(toUserId, {
      $addToSet: { friends: fromUserId },
    });
  
    // Delete the buddy request after it's accepted
    await BuddyRequest.findByIdAndDelete(requestData.requestId);
  
    return { message: 'Buddy request accepted' };
  };

  export const viewRequests = async (user: any) => {
    const userId = user._id;
    console.log(userId);
  
    const requests = await BuddyRequest.find({ fromUser: userId });
    console.log(requests);
  
    // Use map to create an array of promises
    const userRequests = await Promise.all(
      requests.map(async (request) => {
        const userData:any={}
        const user = await User.findById(request.toUser);
        userData.name = user?.name;
        userData.requestId = request._id;
        userData.email=user?.email;

        return userData;
      })
    );
  
    return userRequests;
  };