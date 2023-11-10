import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainIndex from "./components/main-section/MainIndex"; 
import MainHeader from "./components/header-section/MainHeader";
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
    <div className="App"> 
    <MainHeader />
      <Routes>
        <Route path="/" element={<MainIndex />} /> 
        <Route path="/auth" element={<Auth updateToken={updateToken} />} />
      </Routes>
    </div>
  );
}

export default App;
