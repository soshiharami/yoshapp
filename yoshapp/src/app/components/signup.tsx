import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/register', { name, email, password }, { withCredentials: true });
      e.preventDefault()
      router.push('/')
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Register;

