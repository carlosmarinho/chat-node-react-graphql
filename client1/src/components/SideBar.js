import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "./UserCard";

const users = [
  { id: 1, firstName: "Carlos", lastName: "Marinho" },
  { id: 2, firstName: "Eloah", lastName: "França" },
  { id: 3, firstName: "Cadu", lastName: "Silva" },
];

const SideBar = ({ setLoggedIn }) => {
  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Chat</Typography>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem("jwt");
            setLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {users.map((item) => {
        return <UserCard key={item.id} item={item} />;
      })}
    </Box>
  );
};

export default SideBar;
