# Facial Recognition Authentication System (Frontend)

This is the **frontend** of a facial recognition-based authentication system built with **React.js** and **face-api.js**. The application allows users to register and log in using facial recognition, providing a secure and modern method of authentication.

## Features

- **Face Registration**: Users can register by scanning their faces.
- **Face Login**: Users can log in using facial recognition.
- **Dynamic Navigation**: Upon successful login, the navigation bar dynamically updates to show the logged-in user's name.
- **User Profile**: After login, users are redirected to a `/user` route where their name is displayed along with placeholder content.
- **Real-time Face Detection**: Utilizes `face-api.js` for accurate face detection and matching.
- **React Toast Notifications**: Provides real-time feedback using `react-toastify`.

## Tech Stack

- **Frontend**: React.js
- **Face Recognition**: `face-api.js`
- **Styling**: Tailwind CSS for responsive UI components
- **Notifications**: `react-toastify` for alert messages

## Installation

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Steps

1. Clone this repository and navigate to the `frontend` folder:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`.

4. Ensure you have the models required for `face-api.js`:
   - Download the models (ssdMobilenetv1, faceLandmark68Net, faceRecognitionNet) and place them in a `/public/models` directory.

## Project Structure

```bash
├── public
│   ├── models          # Pre-trained face-api.js models
│   └── index.html
├── src
│   ├── components
│   │   ├── Login.js    # Facial recognition login component
│   │   ├── Register.js # Facial registration component
│   │   ├── User.js     # User profile component
│   │   └── Nav.js      # Navigation bar component
│   ├── App.js          # Main application component
│   └── index.js        # Entry point
└── package.json
```

## Usage

1. **Register**: Visit the `/` (Register) route to register your face.
2. **Login**: Go to the `/login` route to log in with your face.
3. **User Profile**: Upon successful login, you'll be redirected to the `/user` page where your name will be displayed along with some dummy user content.

## Future Improvements

- **Mobile Optimization**: Enhance the UI and face detection to work seamlessly on mobile devices.
- **Face Descriptor Encryption**: Securely encrypt facial descriptors before sending them to the backend.
- **Persistent Login**: Implement local storage or cookies to persist the login session.

## License

This project is licensed under the MIT License. Feel free to modify and use it for your own purposes.

---

This README provides clear instructions for setting up and running the frontend part of the facial recognition-based authentication system.