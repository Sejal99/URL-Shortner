import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
    // Redirect or perform other actions as needed
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>SnipIt</h1>
      </div>

      <div style={styles.buttonContainer}>
        {!isAuthenticated && (
          <>
            <button style={styles.navButton} onClick={() => navigate("/signup")}>
              Signup
            </button>
            <button style={styles.navButton} onClick={() => navigate("/signin")}>
              Signin
            </button>
          </>
        )}
        {isAuthenticated && (
          <button style={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#ffffff", // Change to your preferred background color
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
  },
  logoContainer: {
    fontSize: 20,
  },
  logo: {
    margin: 0,
    color: "#333333", // Change to your preferred text color
  },
  buttonContainer: {
    display: "flex",
    gap: 10,
    cursor: "pointer",
  },
  navButton: {
    padding: "8px 15px",
    borderRadius: 5,
    background: "#f79b3c", // Change to your preferred button color
    color: "#ffffff", // Change to your preferred text color
    border: "none",
    cursor: "pointer",
    fontSize: 14,
  },
};

export default Navbar;
