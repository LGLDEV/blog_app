import { Schema, model } from "mongoose";


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    text: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        select: true,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        required: true
    }
},  { timestamps: true })

export default model('Blog', blogSchema)   