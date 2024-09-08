import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Nav from './components/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userName, setUserName] = useState('');
  const [registeredFaces, setRegisteredFaces] = useState([]);

  const handleLogin = (name) => {
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Nav userName={userName} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Register registeredFaces={registeredFaces} setRegisteredFaces={setRegisteredFaces} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/user" element={<User />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
