import { Button, Card, TextField, Typography } from "@mui/material"
import { Box, Stack } from "@mui/material"
import { useRef, useState } from "react"

const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [formData, setFormData] = useState({})
  const authForm = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

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
      <Card
        variant="outlined"
        sx={{ padding: "10px" }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: "400px" }}
        >
          <Typography variant="h5">Please {showLogin ? "Login" : 'Signup'}</Typography>
          {
            !showLogin &&
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                onChange={handleChange} />
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange} /></>
          }
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
          <Typography textAlign="center" variant="subtitle1" onClick={()=>{
            setShowLogin((preValue) => !preValue)
            setFormData({});
            authForm.current.reset()
          }}>
            {showLogin ? "Signup?" : "Login?"}
          </Typography>
          
          <Button variant="outlined" type="submit"> {showLogin ? "Login" : 'Signup'}</Button>
        </Stack>
      </Card>
    </Box>
  )
}

export default AuthScreen

