import User from "../models/User.js";

//READ
export const getUser=async (req,res)=>{
    try {
        const {id}=req.body;
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({err:error.message});
    }
}