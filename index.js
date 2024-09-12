import express from 'express';
import  dotenv from 'dotenv'
import connectDb from './utils/db.js';
import Router from './routes/index.js';

dotenv.config();

const app=express();

app.use(express.json());

const Port=process.env.PORT || 5000;

app.listen(Port,()=>{
    connectDb();
    console.log(`server running at port ${Port}`)
})
app.use('/api/',Router)
