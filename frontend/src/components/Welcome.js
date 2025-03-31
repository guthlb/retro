// Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome.png';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <img src={welcomeImage} alt="Welcome to Retro Vinyl" className="welcome-img" />
      <button className="start-button" onClick={() => navigate('/home')}>
        PICKUP !
      </button>
    </div>
  );
}

export default Welcome;
