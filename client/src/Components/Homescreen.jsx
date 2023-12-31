import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/pic.jpg';

const Homescreen = () => {
  const [url, setUrl] = useState('');
  const [shortenedId, setShortenedId] = useState('');
  const [error, setError] = useState(null);
  const { shortId } = useParams();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Check if there is a shortId in the URL, and fetch the redirect URL
    if (shortId) {
      const fetchRedirectUrl = async () => {
        try {
          const response = await fetch(`http://localhost:8001/${shortId}`);
          if (response.ok) {
            const data = await response.json();
            setRedirectUrl(data.redirectURL);
          } else {
            setError('Failed to fetch redirect URL');
          }
        } catch (error) {
          setError(`Error: ${error.message}`);
        }
      };

      fetchRedirectUrl();
    }
  }, [shortId]);

  async function getAnalyticsData(shortId) {
    try {
      const response = await fetch(`http://localhost:8001/url/analytics/${shortId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched analytics:', data);
      return {
        totalClicks: data.totalClicks,
        analytics: data.analytics,
      };
    } catch (error) {
      console.error('Error fetching analytics:', error.message);
      throw error;
    }
  }

  const handleShorten = async () => {
    try {
      const response = await fetch('http://localhost:8001/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedId(data.id);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(`Failed to shorten URL. Server Error: ${errorData.error}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleRedirect = async () => {
    try {
      const response = await fetch(`http://localhost:8001/${shortenedId}`);
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirectURL;
      } else {
        setError('Failed to fetch redirect URL');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleAnalytics = async () => {
    try {
      const analyticsData = await getAnalyticsData(shortenedId);
      setAnalytics(analyticsData);
    } catch (error) {
      setError(`Error fetching analytics: ${error.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      marginTop: '-70px',
    //  position: 'relative',
    }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          opacity: 0.6, // Adjust the opacity value
          zIndex: -1, // Move the pseudo-element to the background
        }}/>
      <h1 style={{ marginBottom: '-6px', color: '#1d2e4a', marginTop: '-30px'}}>Shorten your looooong URLs</h1>
      <h1 style={{ marginTop: '0px', color: '#1d2e4a' }}>like never before!</h1>

      <TextField
        style={{ width: '400px' }}
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faLink} style={{ marginRight: '8px' }} />
            </InputAdornment>
          ),
        }}
        label="Enter your Url"
      />
      <Button variant="contained" style={{ top: 20, borderRadius: 20, backgroundColor: '#1d2e4a', width: '170px' }} onClick={handleShorten}>
        Shorten
      </Button>
      {shortenedId && (
        <p style={{ marginTop: '40px' }}>
          Shortened URL:{' '}
          <a  target="_blank" rel="noopener noreferrer" onClick={handleRedirect}
          style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          >
            
            http://localhost:8001/{shortenedId}
          </a>
        </p>
      )}

      {/* <Button variant="contained" style={{ top: 20, borderRadius: 20, backgroundColor: '#f79b3c', width: '170px' }} onClick={handleAnalytics}>
        Analytics
      </Button>

      {analytics && (
        <div>
          <h1>Total Clicks: {analytics.totalClicks}</h1>
          <ul>
            {analytics.analytics.map((entry, index) => (
              <li key={index}>
                Timestamp: {entry.timestamp}, ID: {entry._id}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Homescreen;
