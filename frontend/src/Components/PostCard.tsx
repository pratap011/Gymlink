import React from 'react';

interface PostProps {
  username: string;
  content: string;
  mediaUrl?: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}

export default function PostCard({ username, content, mediaUrl, likes, comments, createdAt }: PostProps) {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">@{username}</h4>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>

      <p className="text-gray-700 mb-3">{content}</p>

      {mediaUrl && (
        <div className="mb-3">
          <img
            src={mediaUrl}
            alt="post media"
            className="rounded-lg w-full max-h-96 object-contain border"
          />
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-600">
        <p>❤️ {likes.length} Likes</p>
        <p>💬 {comments.length} Comments</p>
      </div>
    </div>
  );
}
