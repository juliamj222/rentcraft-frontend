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
import WelcomeIndex from "./components/main-section/WelcomeIndex";
import UnitDisplay from "./components/unit/UnitDisplay";
import UnitFeedById from "./components/unit/UnitFeedById";
import TenantsCreate from "./components/tenants-section/TenantsCreate"; 
import Paymentparams from "./components/payments-section/PaymentNavbar";



import PaymentsCreate from "./components/payments-section/PaymentsCreate";

import PaymentsUnitHistory from "./components/payments-section/PaymentsUnitHistory";
import PaymentsTenantHistory from "./components/payments-section/PaymentsTenantHistory";

import Navigation from "./components/navigation-section/NavBar"
import ReturnToAuth from "./components/navigation-section/ReturnToAuth";


function App() {
  const [token, setToken] = useState("");
  const [currentId, setCurrentId] = useState(""); 
  
  
  //new 
  const clearToken = () =>{
    localStorage.clear()
    setToken('')
    console.log('logging out...') 
    
    
  }


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
      console.log(currentId);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("background");
  }, []);

  return (

    <div className="App">
      <MainHeader token={token} currentId={currentId} />
      <NavBar token={token} currentId={currentId} clickLogout={clearToken}/>

    <div className="app-container">
      <div
        className="navbar-header-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavBar
          token={token}
          currentId={currentId}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "right",
          }}
        />
        <MainHeader
          token={token}
          currentId={currentId}
          style={
            {
              //  display: "flex",
            }
          }
        />
      </div>
      {/* MAIN CONTENT AREA */}
      <Routes>
        <Route
          path="/feed/:id"
          element={<MainIndex 
            token={token} 
            currentId={currentId} />}
        />
        <Route
          path="/unit/view-by-id/:id"
          element={<UnitFeedById 
            token={token} 
            currentId={currentId} />}
        />
        <Route
          path="/"
          element={<WelcomeIndex 
            token={token} 
            currentId={currentId} />}
        />
        <Route
          path="/auth"
          element={


            <Auth 
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              //currentId={currentId}

            />
          }
        />
        <Route
          path="/tenant/create"
          element={
            <TenantsCreate
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />

        <Route
          path="/payments/create/:id"
          element={
            <PaymentsCreate
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />

        <Route
          path="/user/:id"
          element={
            <ProfileView
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />
        <Route
          path="/tenants/view-all/:id"
          element={
            <TenantsIndex
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />
        <Route
          path="/payments/user/:id"
          element={
            <PaymentsIndex
              token={token}
              updateToken={updateToken}
              currentId={currentId}
              updateCurrentId={updateCurrentId}
            /> 
          }
        />

        <Route
          path="/payments/unit/:id"
          element={
            <PaymentsUnitHistory
              token={token}
              updateToken={updateToken}
              currentId={currentId}
              updateCurrentId={updateCurrentId}
            />
          }
        />

        <Route
          path="/payments/tenant/:id"
          element={
            <PaymentsTenantHistory
              token={token}
              updateToken={updateToken}
              currentId={currentId}
              updateCurrentId={updateCurrentId}
            />
          }
        />

        <Route
          path="/unit/create"
          element={
            <UnitCreate
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />
        <Route
          path="/unit/view-all"
          element={
            <MainIndex
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />
        <Route
          path="/update-unit/:id"
          element={
            <UnitUpdate
              token={token}
              updateToken={updateToken}
              updateCurrentId={updateCurrentId}
              currentId={currentId}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
