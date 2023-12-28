import React, { useState } from 'react';
import { Button, TextField, Card, Typography } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  console.log(email);
  const [password, setPassword] = useState('');
  console.log(password);

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Pass email and password in the request body
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data.user);
        window.location.href = '/signin';
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant={'h6'}>
          Welcome to SnipIt. Sign up below
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={'password'}
          />
          <br />
          <br />

          <Button
            size={'large'}
            variant="contained"
            style={{ backgroundColor: '#f79b3c' }}
            onClick={handleSignup} // Call handleSignup when the button is clicked
          >
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
