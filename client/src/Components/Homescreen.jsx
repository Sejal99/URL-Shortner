import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/pic.jpg";
import { BASE_URL } from "../../config";

const Homescreen = () => {
  const [url, setUrl] = useState("");
  const [shortenedId, setShortenedId] = useState("");
  const [error, setError] = useState(null);
  const { shortId } = useParams();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("ooooooo");
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);
        const headers = {
          authorization: token,
          "Content-Type": "application/json",
        };
        console.log("headers", headers);
        const res = await fetch(`${BASE_URL}/url`, {
          headers: headers,
        });
        console.log("iiiir", res);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data);
        console.log("Data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleShorten = async () => {
    try {
      const response = await fetch(`${BASE_URL}/url`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
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




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          content: "''",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          opacity: 0.6,
          zIndex: -1,
        }}
      />
      <h1
        style={{ marginBottom: "-6px", color: "#674099", marginTop: "-30px" }}
      >
        Shorten your looooong URLs
      </h1>
      <h1 style={{ marginTop: "0px", color: "#674099" }}>like never before!</h1>

      <input
        type="text"
        style={{
          width: "400px",
          padding: "15px",
          borderRadius: "35px",
          border: "none",
          margin: "0",
          outline: "none",
          marginBottom: "20px",
        }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your Url"
      />
      <button
        style={{
          padding: "10px",
          borderRadius: "20px",
          backgroundColor: "#9b74cf",
          width: "150px",
          border: "none",
          margin: "0",
          outline: "none",
        }}
        onClick={handleShorten}
      >
        Shorten
      </button>
      <div style={{ marginTop: "20px" }}>
  <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid black", padding: "8px" }}>Shortened URL</th>
        <th style={{ border: "1px solid black", padding: "8px" }}>View Count</th>
      </tr>
    </thead>
    <tbody>
      {data.map((val, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            <a
              target="_blank"
              href={`${BASE_URL}/${val.shortId}`}
              style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
            >
             ${BASE_URL}/{val.shortId}
            </a>
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {val.visitHistory.length}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* {shortenedId && (
        <p style={{ marginTop: "40px" }}>
          Shortened URL:{" "}
          <a
            target="_blank"
           href={`http://localhost:8001/${shortenedId}`}
         
           // onClick={handleRedirect}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "blue",
            }}
          >
            http://localhost:8001/{shortenedId}
          </a>
        </p>
      )} */}

      {/* <button
        style={{ margin: '10px', padding: '10px', borderRadius: '20px', backgroundColor: '#1d2e4a', color: 'white' }}
        onClick={handleAnalytics}
      >
        Analytics
      </button> */}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Homescreen;
