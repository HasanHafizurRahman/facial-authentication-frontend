import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [registeredFaces, setRegisteredFaces] = useState([]);

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

  const fetchRegisteredFaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faces');
      setRegisteredFaces(response.data); // Set registered faces from the server
    } catch (err) {
      toast.error('Error fetching registered faces.', { position: 'top-right' });
    }
  };

  useEffect(() => {
    fetchRegisteredFaces();
  }, []);

  const handleLoginFace = async () => {
    setIsAuthenticating(true);
    const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();

    if (detections && registeredFaces.length > 0) {
      const faceMatcher = new faceapi.FaceMatcher(registeredFaces.map(f => new faceapi.LabeledFaceDescriptors(f.username, [new Float32Array(f.descriptor)])), 0.6);
      const match = faceMatcher.findBestMatch(detections.descriptor);

      if (match.label !== 'unknown') {
        toast.success(`Logged in as ${match.label}`, { position: 'top-right' });
      } else {
        toast.error('Face not recognized. Please try again.', { position: 'top-right' });
      }
    } else {
      toast.error('No face detected. Please try again.', { position: 'top-right' });
    }

    setIsAuthenticating(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <video ref={videoRef} autoPlay muted className="rounded shadow-lg"></video>
      <button
        onClick={handleLoginFace}
        disabled={!modelsLoaded || isAuthenticating}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {isAuthenticating ? 'Authenticating...' : 'Login with Face'}
      </button>
    </div>
  );
};

export default Login;
