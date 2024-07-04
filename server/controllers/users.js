import User from "../models/User.js";

//READ
export const getUser=async (req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({err:error.message});
    }
}

export const getUserFriends=async (req,res)=>{
    try {
        const {id} =req.params;
        const user =await User.findById(id);

        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );

        const formatFriends=friends.map(
            ({_id,firstname,lastName,occupation,location,picturePath})=>{
                return {_id,firstname,lastName,occupation,location,picturePath};
            }
        );
        res.status(200).json(formatFriends)
    } catch (error) {
        res.status(404).json({err:error.message});
    }        
}

//UPDATE FRIENDS

export const addRemoveFriends=async (req,res)=>{
    try {
        const {id,friendId}=req.params;
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        if(user.friends.include(friendId)){
            user.friends=user.friends.filter((id)=> id !== friendsId);
            friend.friends=friend.friends.filter((id)=>id !== id)
        }
        await user.save();
        await friend.save()

        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );

        const formatFriends=friends.map(
            ({_id,firstname,lastName,occupation,location,picturePath})=>{
                return {_id,firstname,lastName,occupation,location,picturePath};
            }
        );
       res.status(200).json(formatFriends)
    } catch (error) {
        res.status(404).json({err:error.message});  
    }
}