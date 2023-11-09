import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainIndex from "./components/main-section/MainIndex";
//imre import useeffect
import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainIndex />} />
      </Routes>
    </div>
  );
}

export default App;
