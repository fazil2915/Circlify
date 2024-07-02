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
const storage =diskStorage({
    destination:function(req,res,cb){
        cb(null,file.orginalname)
    }
});
const upload={storage}

app.get("/",(req,res)=>{
    res.send("hey there");
})
//server
const startServer= ()=>{
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(8000,()=>{
            console.log("server running on http://localhost:8000");
        })
    } catch (error) {
        console.log(error);
    }
    
}
startServer()