import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required:false
    }, 
    email: {
        type: String,
        unique: true,
        required:true
    }, 
    passwordHash: {
        type: String,
        required:true
    }, 
    image: {
        type: String,
        required:false
    }, 
},  { timestamps: true })

export default model('User', userSchema)   