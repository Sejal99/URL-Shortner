import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const Homescreen = () => {
  const [url, setUrl] = useState('');
  const [shortenedId, setShortenedId] = useState('');
  const [error, setError] = useState(null);
  const { shortId } = useParams();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shortened URL and redirect URL
        const response = await fetch(`http://localhost:8001/${shortId}`);
        if (response.ok) {
          const data = await response.json();
          setRedirectUrl(data.redirectURL);
        } else {
          setError('Failed to fetch redirect URL');
          return;
        }

        // Fetch analytics data
        const analyticsResponse = await fetch(`http://localhost:8001/url/analytics/${shortId}`);
        if (analyticsResponse.ok) {
          const analyticsData = await analyticsResponse.json();
          setAnalytics(analyticsData);
        } else {
          setError('Failed to fetch analytics data');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };

    if (shortId) {
      fetchData();
    }
  }, [shortId]);

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

        const redirectResponse = await fetch(`http://localhost:8001/${data.id}`);
        if (redirectResponse.ok) {
          const redirectData = await redirectResponse.json();
          setRedirectUrl(redirectData.redirectURL);
        } else {
          setError('Failed to fetch redirected URL');
        }
      } else {
        const errorData = await response.json();
        setError(`Failed to shorten URL. Server Error: ${errorData.error}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', marginTop: '-70px' }}>
      <h1 style={{ marginBottom: '-3px', color: 'purple' }}>Shorten your looooong URLs</h1>
      <h1 style={{ marginTop: '0px', color: 'purple' }}>like never before!</h1>

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
      <Button variant="contained" style={{ top: 20, borderRadius: 20, backgroundColor: '#f79b3c', width: '170px' }} onClick={handleShorten}>
        Shorten
      </Button>
      {shortenedId && (
        <p style={{ marginTop: '40px' }}>
          Shortened URL:{' '}
          <a href={`http://localhost:8001/${shortenedId}`} target="_blank" rel="noopener noreferrer">
            http://localhost:8001/{shortenedId}
          </a>
        </p>
      )}
      {redirectUrl && (
        <p>
          Redirect URL:{' '}
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
            {redirectUrl}
          </a>
        </p>
      )}

      {analytics && (
        <div>
          <p>Total Clicks: {analytics.totalClicks}</p>
          <p>Analytics: {JSON.stringify(analytics.analytics)}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Homescreen;
