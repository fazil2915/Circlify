import { ManageAccounts,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    ManageAccountsOutlined
 } from "@mui/icons-material";
 import {Box, Typography , Divider,useTheme} from "@mui/material"
 import UserImage from "@/components/userImage";
 import FlexBetween from "@/components/FlexBetween";
 import widgetWrapper from "@/components/widgetWrapper";
 import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


 const UserWidget= ({userId,picturePath})=>{
    const [user,setUser]= useState(null);
    const {palette}=useTheme();
    const navigate=useNavigate();
    const token=useSelector((state)=> state.token);
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main =palette.neutral.main;


    const getUser= async ()=>{
        const response=await fetch(`http://localhost:8000/api/user/${userId }`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`},
        });
        const data=await response.json();
        setUser(data);
        

    };

    useEffect(()=>{
        getUser();
    },[])

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viwedProfile,
        impressions,
        friends,
    }=user;

    return(
        <widgetWrapper>
            {/* First row*/}
            <FlexBetween gap="0.5rem"
            pb="1.1rem"
            onClick={()=> navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={pic}/>
                    <Box>
                    <Typography varient="h4"
                    color={dark}
                    fontWeight="500"
                    sx={{
                        "&:hover":{
                            color:palette.primary.light,
                            cursor:'pointer'
                        }
                    }}>
                    {firstName} {lastName}
                   </Typography>
                   <Typography color={medium}> 
                     {friends.length} friends
                   </Typography>
                   </Box>
                   <ManageAccountsOutlined/>
                </FlexBetween>
                <Divider/>

                {/*second row*/}
                


            </FlexBetween>
        </widgetWrapper>
    )
 }
