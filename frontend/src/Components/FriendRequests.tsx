import React from 'react';
import {useEffect,useState} from 'react';
import api from '../Services/axios';


export default function FriendRequests() {
  const [requests, setRequests]:any=useState([]);
  useEffect(()=>{
    const fetchRequests= async()=>{
    const token = localStorage.getItem('authToken');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    const response=await api.post('/request/view');
    setRequests([...response.data.requests]);

      }
      fetchRequests();
  },[])
  const handleAccept = async (id: number) => {
    try{
      const response = await api.post('/request/accept',{requestId:id});
      console.log(response);
      setRequests(requests.filter((request:any) => request._id !== id));
    }
    catch{
      alert("Something went wrong!");
    }
  };

  const handleIgnore = (id: number) => {
    console.log(`Ignored request from ${id}`);
  };

  return (
    <div>
      <h3 className="text-xl font-medium mb-3">Friend Requests</h3>
      <div className="space-y-3">
        {requests.map((req:any) => (
          <div key={req._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{req.name}</div>
              <div className="text-sm text-gray-500">{req.email}</div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleAccept(req.requestId)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleIgnore(req.requestId)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
              >
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
