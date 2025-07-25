import React from 'react';
import FriendRequests from '../Components/FriendRequests';
import FriendRecommendations from '../Components/FriendRecommendations';
import Navbar from '../Components/Navbar';

export default function FindFriendsPage() {
  return (
    <>
    <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      <h2 className="text-2xl font-semibold text-gray-800">Find Friends</h2>
      
      <FriendRequests />

      <FriendRecommendations />
    </div>
    </>
  );
}
