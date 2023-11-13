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
      {token && <NavBar />}

      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<MainIndex />} /> 
        <Route path="/auth" element={<Auth updateToken={updateToken} />} />
        <Route path="/user/:id" element={<ProfileView token={token} />} />
        <Route path="/tenants" element={<TenantsIndex token={token} />} />
        <Route path="/payments" element={<PaymentsIndex token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
