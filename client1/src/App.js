import { useState } from "react";
import "./App.css";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") ? true : false
  );

  return (
    <>
      {!loggedIn ? (
        <AuthScreen setLoggedIn={setLoggedIn} />
      ) : (
        <HomeScreen setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
