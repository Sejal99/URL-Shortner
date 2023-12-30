import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/pic.jpg';
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>SnipIt</h1>
      </div>

      <div style={styles.buttonContainer}>
        {
          !Cookies.get('uid')
          ?(
            <>
             <button style={styles.navButton} onClick={() => navigate("/Signup")}>
            Signup
          </button>
          <button style={styles.navButton} onClick={() => navigate("/Signin")}>
            Signin
          </button>
            </>
           
          ):(
            <>
              <button style={styles.navButton} onClick={() => {
                Cookies.remove('uid')
                navigate('/')
              }}>
            Logout
          </button>
            </>
          )

        }
        
      
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
   // background: "#e9e8eb", // Change to your preferred background color
boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
    backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
  },
  logoContainer: {
    fontSize: 20,
  },
  logo: {
    margin: 0,
    color: "#f79b3c", // Change to your preferred text color
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