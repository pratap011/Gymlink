import { useState, useEffect } from 'react';
import React from 'react';
import api from '../Services/axios';
import PostCard from '../Components/PostCard';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

interface Post {
  username: string;
  content: string;
  mediaUrl: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const res = await api.get('/users/fetchfeed');
        setPosts(res.data.posts);
      } catch (err) {
        console.error('Failed to fetch feed:', err);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (Optional for future expansion) */}
        

        {/* Feed Section */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
          <div className="space-y-4">
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
