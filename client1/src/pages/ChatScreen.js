import {
  Toolbar,
  Typography,
  AppBar,
  Avatar,
  TextField,
  Box,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          <Avatar
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding="10px"
        sx={{ overflowY: "auto" }}
      >
        <MessageCard text="Hi carlos" date="1233" direction="start" />
        <MessageCard text="Hi carlos" date="1233" direction="end" />
        <MessageCard text="Hi carlos" date="1233" direction="start" />
      </Box>
      <TextField
        placeholder="Enter a Message"
        variant="standard"
        fullWidth
        multiline
        rows={2}
      />
    </Box>
  );
};

export default ChatScreen;
