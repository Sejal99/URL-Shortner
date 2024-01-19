import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/pic.jpg';

const Homescreen = () => {
  const [url, setUrl] = useState('');
  const [shortenedId, setShortenedId] = useState('');
  const [error, setError] = useState(null);
  const { shortId } = useParams();
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    if (shortId) {
      const fetchRedirectUrl = async () => {
        try {
          const response = await fetch(`https://url-shortner-46dr.vercel.app/${shortId}`);
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
      const response = await fetch('https://url-shortner-46dr.vercel.app/url', {
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
      const response = await fetch(`https://url-shortner-46dr.vercel.app/${shortenedId}`);
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
      console.log(analyticsData);
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
          opacity: 0.6,
          zIndex: -1,
        }}
      />
      <h1 style={{ marginBottom: '-6px', color: '#674099', marginTop: '-30px'}}>Shorten your looooong URLs</h1>
      <h1 style={{ marginTop: '0px', color: '#674099' }}>like never before!</h1>

      <input
  type="text"
  style={{ width: '400px', padding: '15px', borderRadius: '35px', border: 'none', margin: '0', outline: 'none', marginBottom: '20px' }}
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  placeholder="Enter your Url"
/>
<button
  style={{ padding: '10px', borderRadius: '20px', backgroundColor: '#9b74cf', width:'150px', border: 'none', margin: '0', outline: 'none' }}
  onClick={handleShorten}
>
  Shorten
</button>



      {shortenedId && (
        <p style={{ marginTop: '40px' }}>
          Shortened URL:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRedirect}
            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
          >
            https://url-shortner-46dr.vercel.app/{shortenedId}
          </a>
        </p>
      )}

      {/* <button
        style={{ margin: '10px', padding: '10px', borderRadius: '20px', backgroundColor: '#1d2e4a', color: 'white' }}
        onClick={handleAnalytics}
      >
        Analytics
      </button> */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Homescreen;
