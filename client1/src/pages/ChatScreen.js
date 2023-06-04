import {
  Toolbar,
  Typography,
  AppBar,
  Avatar,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MSG } from "../graphql/queries";
import { SEND_MSG } from "../graphql/mutation";

const ChatScreen = () => {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      console.log("createdMesage: ", data.createMessage);
      setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    },
  });

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
        {loading ? (
          <Typography variant="h6">loading chats</Typography>
        ) : (
          messages.map((msg) => {
            return (
              <MessageCard
                key={msg.createdAt}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId === +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Enter a Message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({
              variables: {
                receiverId: +id,
                text: text,
              },
            });
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
