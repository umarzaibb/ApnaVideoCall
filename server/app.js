import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import router from "./ROUTES/routes.js";
import socketServer from './utils/Socketio.js';

const app=express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(router);

//mongoDB connection
connectDB();


//server creation
const server=createServer(app);
const io=socketServer(server);

server.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});
