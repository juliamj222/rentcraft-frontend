import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/header-section/MainHeader";
import MainIndex from "./components/main-section/MainIndex";
import NavBar from "./components/navigation-section/NavBar";
import ProfileView from "./components/profile-section/ProfileView";


//imre import useeffect
import React, { useState, useEffect } from "react"; 
import Auth from "./components/authorization-section/Auth";

function App() {
  const [token, setToken] = useState("");
  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);


  return (

    <div className="App" /* style={{ background: "var(--primary)" }} */>
    <MainHeader />

      {token && <NavBar />}

      <Routes>
        <Route path="/" element={<MainIndex />} /> 
        <Route path="/auth" element={<Auth updateToken={updateToken} />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </div>
  );
}

export default App;
