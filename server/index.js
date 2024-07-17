import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import multer, { diskStorage } from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./databse/connect.js"
import authRoutes from "./routes/auth.js"
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users,posts} from "./data/index.js"


//configuration
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));
 
//FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

//ROUTES with files
app.use("/api/auth/register",upload.single("picture"),register)
app.use("/posts",verifyToken,upload.single("picture"),createPost);
//ROUTES 
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoute)
app.use("/api/posts",postRoute)
app.get("/",(req,res)=>{
    res.send("hey there!!");
})
//server
const startServer= ()=>{
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(process.env.PORT||8000,()=>{
            console.log(`server running on http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
    
}
startServer()