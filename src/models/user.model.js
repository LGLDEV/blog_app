import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required:false,
        select: true
    }, 
    email: {
        type: String,
        unique: true,
        required:true,
        select: true
    }, 
    passwordHash: {
        type: String,
        required:true,
    }, 
    image: {
        type: String,
        required:false,
        select: true
    }, 
},  { timestamps: true })

export default model('User', userSchema)   