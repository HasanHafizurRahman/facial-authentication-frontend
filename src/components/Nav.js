import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ userName, onLogout }) => {
  return (
    <nav className="p-4 bg-white shadow flex justify-center">
      {userName ? (
        <>
          <Link to="/user" className="mr-8 font-medium text-blue-500 hover:text-blue-700">{userName}</Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/" className="mr-8 font-medium text-blue-500 hover:text-blue-700">Register</Link>
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-700">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
