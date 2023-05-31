import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/material";
import { LOGIN_USER, SIGNUP_USER } from "../graphql/mutation";

const AuthScreen = ({ setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({});

  const authForm = useRef(null);
  const [signupUser, { data: signupData, loading: l1, error: e1 }] =
    useMutation(SIGNUP_USER);

  const [loginUser, { data: loginData, loading: l2, error: e2 }] = useMutation(
    LOGIN_USER,
    {
      onCompleted(data) {
        localStorage.setItem("jwt", data.signinUser.token);
        setLoggedIn(true);
      },
    }
  );

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        height="100vh"
      >
        <Box textAlign={"center"}>
          <CircularProgress />
          <Typography variant="h6">Authenticating</Typography>
        </Box>
      </Box>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      loginUser({
        variables: {
          userSignin: formData,
        },
      });
    } else {
      signupUser({
        variables: {
          userNew: formData,
        },
      });
    }
  };

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card variant="outlined" sx={{ padding: "10px" }}>
        <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
          {signupData && (
            <Alert severity="success">
              {signupData.signupUser.firstName} Signed Up!
            </Alert>
          )}
          {e1 && <Alert severity="error">{e1.message}</Alert>}
          {e2 && <Alert severity="error">{e2.message}</Alert>}
          <Typography variant="h5">
            Please {showLogin ? "Login" : "Signup"}
          </Typography>
          {!showLogin && (
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange}
                required
              />
            </>
          )}
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="password"
            variant="standard"
            onChange={handleChange}
          />
          <Typography
            textAlign="center"
            variant="subtitle1"
            onClick={() => {
              setShowLogin((preValue) => !preValue);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login?"}
          </Typography>

          <Button variant="outlined" type="submit">
            {" "}
            {showLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
