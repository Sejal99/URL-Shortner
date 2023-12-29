import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const Signin = () => {
    const navigate = useNavigate();
    const [email,setEmail]=useState('')
    console.log(email);
    const [password,setPassword]=useState('')
    console.log(password);
    
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8001/user/login', {
              method: 'POST',
              credentials:'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email, // Pass email and password in the request body
                password: password,
              }),
            });
                if(!response.ok){
                    throw new Error ('network problem')

                }
                const data=await response.json()
                console.log('llllllll',data);
             const token=   Cookies.get('uid')
             console.log(token);
             if(token){
                navigate('/url')
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