import React from 'react';
import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, <span className='text-blue-600'>{username}</span></h1>
      <p className="text-lg">This is your dashboard.</p>
      <p className="text-md">User-specific content goes here.</p>
    </div>
  );
};

export default User;

