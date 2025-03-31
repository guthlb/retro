const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Spotify API credentials
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const playlistIds = [
  '2fyfeyfgdj9R6eeHUt3tqN',
  '2stTgJ7TmJrmSK7La5FDTc',
  '3ibwQK4jQL5yr7SpaB1H0A',
  '3T4QZNPRftKIxpsuoGPnK9',
];

// Get Spotify API token
const getSpotifyToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

// Fetch playlists from Spotify API
app.get('/api/playlists', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const playlistData = await Promise.all(
      playlistIds.map(async (id) => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      })
    );
    res.json(
      playlistData.map((playlist) => ({
        id: playlist.id, // Add Playlist ID
        name: playlist.name,
        image: playlist.images[0]?.url || '',
        description: playlist.description || '',
        tracks: playlist.tracks.items.map((item) => ({
          name: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(', '),
          preview_url: item.track.preview_url,
        })),
      }))
    );
    
    
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).send('Error fetching playlists');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
