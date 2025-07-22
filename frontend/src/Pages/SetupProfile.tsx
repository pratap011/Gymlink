import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/axios';

interface Gym {
  name: string;
}

export default function SetupProfile() {
  const [gym, setGym] = useState('');
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: Ask for geolocation permission
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Step 2: Get city from reverse geocoding API
          const geoRes = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=405211144f1942a79103fe1a9a3a9616`
          );
          const geoData = await geoRes.json();
          console.log(geoData);
          const cityName =
            geoData?.results[0]?.components?.city ||
            geoData?.results?.[0]?.components?.town ||
            geoData?.results?.[0]?.components?.state ||
            'Unknown';
          console.log(cityName);
          setCity(cityName);
          console.log(city);

          // Step 3: Call your gym list API with city
          if (!api.defaults.headers.common['Authorization']) {
            const token = localStorage.getItem('authToken');
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
    
          const gymsRes = await api.get(`/gym/list?city=${cityName}`);
          console.log(gymsRes.data.data);
          setGymList(gymsRes.data.data); // assumes response shape is { gyms: [...] }
          setLoading(false);
        } catch (err) {
          console.error('Failed to get city or gyms:', err);
          alert('Could not fetch nearby gyms.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Location permission is required to fetch gyms.');
        setLoading(false);
      }
    );
  }, []);

  const handleSubmit = async () => {
    if (!gym) return alert('Please select your gym');

    try {
      // Set auth header if not already set
      await api.post('/users/maptogym', { gymName: gym });
      navigate('/home');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Select Your Gym
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading gyms near you...</p>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">Gym Name</label>
            <select
              className="w-full border px-3 py-2 rounded-lg mb-6"
              value={gym}
              onChange={(e) => setGym(e.target.value)}
            >
              <option value="">-- Select a Gym --</option>
              {gymList.map((g, i) => (
                <option key={i} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
            >
              Save & Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
