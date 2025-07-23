import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import api from '../Services/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

interface Post {
  username: string;
  content: string;
  mediaUrl?: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  friends: string[];
  createdAt: string;
}

interface ProfileData {
  user: User;
  posts: Post[];
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const res = await api.get('/users/fetchprofile');
        setProfile(res.data.profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>;

  const { user, posts } = profile;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Profile Content */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {/* User Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-1">📧 {user.email}</p>
          <p className="text-gray-600 mb-1">👥 Friends: {user.friends.length}</p>
          <p className="text-sm text-gray-500">
            🗓 Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* User Posts */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Posts</h3>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-500">You haven't made any posts yet.</p>
            ) : (
              posts.map((post, idx) => <PostCard key={idx} {...post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
