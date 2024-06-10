'use client'
import type React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../components/login';
import Register from '../components/signup';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/current_user', { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      alert('Logout failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
          <h1 className="text-2xl mb-6">Welcome, {user.email}</h1>
          <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700">Logout</button>
        </div>
      ) : (
      <div className='flex'>
       <Login />
       <Register />
    </div>
      )}
    </div>
  );
};

export default Dashboard;

