import { Box, Typography, useTheme } from "@mui/material"
import Friends from "@/components/Friends"
import WidgetWrapper from "@/components/WidgetWrapper"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/state";


const FriendListWidget = ({ userId ,anotherProfile=false}) => {
 
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const user=useSelector((state)=>state.user)
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };



  useEffect(() => {
    getFriends()
    
  }, [])//eslint desable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {anotherProfile ? (
          <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >Friends List
        </Typography>
      ):(
        <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >{user.firstName}'s Friends List
      </Typography>
      )}
      
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friends)&& friends.map((friend) => (
          <Friends
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default FriendListWidget