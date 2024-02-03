import React from "react";
import imageUrl from "../assets/images.png";
import backgroundImage from "../assets/pic.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: 100,
          marginTop: -150,
        }}
      >
        <h1 style={{ alignSelf: "center" }}>Trim URLs for easy sharing</h1>
        <h1 style={{ fontSize: 20 }}>
          "Transform long URLs into concise links with this lightning-fast URL
          shortener."
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <button
            style={{
              marginRight: 10,
              background: "#f79b3c",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              padding: "10px 15px",
              borderRadius: 5,
              fontSize: 14,
            }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            style={{
              marginRight: 10,
              background: "#f79b3c",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              padding: "10px 15px",
              borderRadius: 5,
              fontSize: 14,
            }}
            onClick={() => navigate("/Signin")}
          >
            Signin
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: -40,
          backgroundColor: "pink",
        }}
      >
        <img
          src={imageUrl}
          style={{ width: "400px", height: "400px" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
