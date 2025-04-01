// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import vinylImage from '../assets/vinyl1.png'; // Default vinyl image
import vinylSpin from '../assets/vinylspin.gif'; // Vinyl spin animation
import top1 from '../assets/topp.gif';
import top2 from '../assets/middle.png';

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();

  // Fetch playlists from backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

 
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="app-container">

      {/* TOP RETRO PART */}
      <div className="top">
        <img src={top1} alt="top 1" className="top-img" />
      </div>
      <img src={top2} alt="top 2" className="mid" />

     
      <div className="vinyl-container">
        {playlists.slice(0, 4).map((playlist, index) => (
          <div
            key={index}
            className="vinyl-wrapper"
            onClick={() => handlePlaylistClick(playlist)}
          >
            <div className="vinyl-frame">
              <img
                src={vinylImage}
                alt="Vinyl"
                className="vinyl-img"
                onMouseOver={(e) => (e.currentTarget.src = vinylSpin)}
                onMouseOut={(e) => (e.currentTarget.src = vinylImage)}
              />
            </div>
            <h3 className="vinyl-title">{playlist.name}</h3>
          </div>
        ))}
      </div>

      {/* Display Playlist Details on Click */}
      {selectedPlaylist && (
        <div className="playlist-details">
          <h2>{selectedPlaylist.name}</h2>

          
          <iframe
            src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
            className="spotify-embed"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
