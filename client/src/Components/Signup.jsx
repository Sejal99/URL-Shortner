import React, { useState } from 'react';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email, setEmail] = useState('');
  console.log(email);
  const [password, setPassword] = useState('');
  console.log(password);
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data.user);
        navigate('/signin')
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div >
      <div
        style={{
          paddingTop: '100px',
          marginBottom: '5px',
          textAlign: 'center',
          fontSize:35,  
        }}
      >
        <h6>Welcome to SnipIt. Sign up below</h6>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
          <button
            style={{
              width: '30%',
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#f79b3c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              
             
            }}
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
