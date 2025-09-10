import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js"
import companyRoutes from "./routes/companyRoute.js"
import jobRoutes from "./routes/jobRoutes.js"
import applicationRoute from "./routes/applicationRoute.js"
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
  origin: "https://nextround-uo4n.onrender.com",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// Default route or home route
app.get('/', (req, res)=>{
    res.send("hello node")
})

// route for user -> login, registration, logout, update profile
app.use('/api/v1/user', userRoutes)

// route for company -> register, update
app.use('/api/v1/company', companyRoutes)

// route for job -> register, get
app.use('/api/v1/job', jobRoutes)

// route for job -> register, get
app.use('/api/v1/application', applicationRoute)

// starting the server and connecting with mongodb
app.listen(PORT, ()=>{
    connectDB();
})