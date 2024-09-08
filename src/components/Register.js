import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = ({ setRegisteredFaces }) => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error('Error accessing webcam:', err));
  };

  const handleRegisterFace = async () => {
    if (!username) {
      toast.error('Please enter a username.', { position: 'top-right' });
      return;
    }
  
    setIsRegistering(true);
    const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();
  
    if (detections) {
      const descriptor = Array.from(detections.descriptor);
  
      console.log('Sending data:', {
        username,
        descriptor,
      });
  
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username,
          descriptor: [descriptor],
        });
  
        console.log('Server response:', response);
  
        if (response.status === 200) {
          setRegisteredFaces(prevFaces => [...prevFaces, descriptor]);
          toast.success('Face registered successfully!', { position: 'top-right' });
        } else {
          toast.error('Error registering face. Try again.', { position: 'top-right' });
        }
      } catch (err) {
        console.error('Server error:', err);
        toast.error('Server error. Please try again.', { position: 'top-right' });
      }
    } else {
      toast.error('No face detected. Please try again.', { position: 'top-right' });
    }
  
    setIsRegistering(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Register Your Face</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 px-4 py-2 border rounded"
      />
      <video ref={videoRef} autoPlay muted className="rounded-lg shadow-lg mb-4 max-w-full"></video>
      <button
        onClick={handleRegisterFace}
        disabled={!modelsLoaded || isRegistering}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isRegistering ? 'Registering...' : 'Register Face'}
      </button>
    </div>
  );
};

export default Register;
