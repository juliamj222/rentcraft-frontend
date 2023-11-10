import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainIndex from "./components/main-section/MainIndex";
import NavBar from "./components/navigation-section/NavBar";

//imre import useeffect
import React, { useState, useEffect } from "react";

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
      {token && <NavBar />}
      <Routes>
        <Route path="/" element={<MainIndex />} />
      </Routes>
    </div>
  );
}

export default App;
