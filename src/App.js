import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/header-section/MainHeader";
import MainIndex from "./components/main-section/MainIndex";
import NavBar from "./components/navigation-section/NavBar";
import ProfileView from "./components/profile-section/ProfileView";

//imre import useeffect
import React, { useState, useEffect } from "react";
import Auth from "./components/authorization-section/Auth";
import TenantsIndex from "./components/tenants-section/TenantsIndex";
import PaymentsIndex from "./components/payments-section/PaymentsIndex";
import UnitCreate from "./components/unit/UnitCreate";
import UnitUpdate from "./components/unit/UnitUpdate";

function App() {
  const [token, setToken] = useState("");
  const [currentId, setCurrentId] = useState("");

  function updateCurrentId(newCurrentId) {
    setCurrentId(newCurrentId);
    localStorage.setItem("CurrentId", newCurrentId);
  }

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

    useEffect(() => {
    const currentId = localStorage.getItem("CurrentId");
    if (currentId) {
      setCurrentId(currentId);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("background");
  }, []);

  return (
    <div className="App" /* style={{ background: "var(--primary)" }} */>
      <MainHeader />
      <NavBar />
      {/* MAIN CONTENT AREA */}
      <Routes>
        <Route path="/:id" element={<MainIndex token={token} />} />
        <Route path="/auth" element={<Auth updateToken={updateToken} />} />

        <Route path="/user/:id" element={<ProfileView token={token} />} />
        <Route path="/tenants" element={<TenantsIndex token={token} />} />
        <Route path="/payments" element={<PaymentsIndex token={token} />} />

        <Route path="/unit/create" element={<UnitCreate token={token} />} />
        <Route path="/unit/view-all" element={<MainIndex token={token} />} />
        <Route path="/update-unit/:id" element={<UnitUpdate token={token} />} />

      </Routes>
    </div>
  );
}

export default App;
