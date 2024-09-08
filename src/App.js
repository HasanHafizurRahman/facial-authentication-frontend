import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [registeredFaces, setRegisteredFaces] = useState([]); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow flex justify-center">
        <Link to="/" className="mr-8 font-medium text-blue-500 hover:text-blue-700">Register</Link>
        <Link to="/login" className="font-medium text-blue-500 hover:text-blue-700">Login</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Register registeredFaces={registeredFaces} setRegisteredFaces={setRegisteredFaces} />}
          />
          <Route
            path="/login"
            element={<Login registeredFaces={registeredFaces} />}
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;

