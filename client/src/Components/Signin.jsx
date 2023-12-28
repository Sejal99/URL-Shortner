import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";

import Cookies from 'js-cookie';

const Signin = () => {
    const [email,setEmail]=useState('')
    console.log(email);
    const [password,setPassword]=useState('')
    console.log(password);
    useEffect(() => {
        // Check if the user is already logged in (cookie exists)
        const storedToken = Cookies.get('uid');
        if (storedToken) {
          // Redirect to '/url' if the token exists
          window.location.href = '/url';
        }
      }, []); 
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8001/user/login', {
                email: email,
                password: password,
            });
    
            if (response.status === 200) {
                const data = response.data;
                console.log('Login successful:', data.user);
                if (data.token != null) {
                    // Save the token to a cookie
                    Cookies.set('uid', data.token);
                    console.log('Token:', data.token);
          
                    // Redirect to the '/url' page
                    window.location.href = '/url';}
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    return <div>
    <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
    }}>
        <Typography variant={"h6"}>
        Welcome Back! Sign in below
        </Typography>
    </div>
<div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{width: 400, padding: 20}}>
        <TextField
            onChange={(event) => {
                setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
        />
        <br/><br/>
        <TextField
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
        />
        <br/><br/>

        <Button
            size={"large"}
            variant="contained"
         style={{backgroundColor:'#f79b3c'}}
         onClick={handleLogin}
            

        > Signin</Button>
    </Card>
</div>
</div>
}

export default Signin;