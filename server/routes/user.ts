import express from 'express'
import { userModel } from '../models/user'
import jwt from 'jsonwebtoken'
import { vertifyJwt } from '../middleware/verifyJwt'
const router= express.Router()
const secret= 'secret'


router.post('/', async(req,res)=>{
    try{
        const {email, password}= req.body
       const data=  await userModel.create({email, password})
        data.save()
        res.status(200).json("User registered successfully!")
    }catch(err){
        res.status(404).json(err)
    }
})

router.post('/signin', async(req,res)=> { 
    
    try{
        const {email, password}= req.body 
        
        // const user = await userModel.findOne(email, password) //here password is in hashed form, so it cannot find such password user in db. So first we'll hash and then will check for that hashed email user.
        
        const user = await userModel.matchPassword(email, password) 

        if (!user) {
            return res.status(400).json('User does not exist!');
        }
 
        if(!process.env.SECRET_KEY){
            return res.sendStatus(403)
        }
        const token= jwt.sign({id:user._id , role:user.role}, process.env.SECRET_KEY , {expiresIn:"1h"})
        
        res.status(200).json(token)
        
        
    }catch(err){
        res.status(400).json(err)
    }
}) 


export default router
