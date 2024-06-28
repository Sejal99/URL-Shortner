import mongoose from "mongoose";

const urlSchema= new mongoose.Schema({
    shortId : {
        type:String,
        required:true,
        unique:true
    },
    redirectUrl: {
        type:String,
        required:true,
        unique:false
    },
    visitHistory: [{
        timestamp: {
            type:Number,
            required:true
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
}, { timestamps:true})

export const urlModel = mongoose.model('url', urlSchema)