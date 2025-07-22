import React, { useState } from 'react';

const mockRecommendations = [
  { id: 1, name: 'Alice Ray', email: 'alice@example.com' },
  { id: 2, name: 'Bob Martin', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com' },
];

export default function FriendRecommendations() {
  const [search, setSearch] = useState('');

  const filtered = mockRecommendations.filter((rec) =>
    rec.name.toLowerCase().includes(search.toLowerCase()) ||
    rec.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendRequest = (id: number) => {
    console.log(`Sent friend request to ${id}`);
  };

  return (
    <div>
      <h3 className="text-xl font-medium mb-3">Recommendations</h3>
      <input
        type="text"
        placeholder="Search friends..."
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-3">
        {filtered.map((user) => (
          <div key={user.id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <button
              onClick={() => handleSendRequest(user.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add Friend
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center">No matching users found.</p>
        )}
      </div>
    </div>
  );
}
