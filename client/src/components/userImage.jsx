import {Box } from "@mui/material"


const UserImage =({ image,size="60%" })=>{
    return(
    <Box width={size} height={size}>
        <img 
        style={{objectFit :"cover" , borderRadius:'50%'}}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:8000/assets/${image}`}/>
    </Box>
    )
}

export default UserImage;