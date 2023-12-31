import dotenv from 'dotenv'
import express from 'express';

// services
import { connection } from './servises/mongodb.service.js';

// routes
import authRoute from './routes/auth.routes.js';
import blogRoute from './routes/blog.routes.js';

// app setup 
dotenv.config()
const app = express();
app.use(express.json())



// use routes
app.use('/auth', authRoute)
app.use('/blog', blogRoute)



const start = async () => {
    app.listen(process.env.PORT, async (err) => {
        if(err) {
            console.log(err)
        }
        console.log(`> Server running on ${process.env.PORT} port`)
    }) 
    await connection(process.env.MONGO)
}

start()