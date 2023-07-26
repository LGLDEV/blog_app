import dotenv from 'dotenv'
import express from 'express';


// app setup 
dotenv.config()
const app = express();
app.use(express.json())



app.get('/', (req,res) => {
    return res.json({
        msg: "Hello"
    })
})




app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err)
    }
    console.log(`Server running on ${process.env.PROT} port`)
}) 