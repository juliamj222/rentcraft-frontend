import { useState } from "react"
import LoginButton from "../../ui/LoginButton";
import Login from "./Login"
import Register from "./Register" 
import { Button } from "reactstrap"; 
import "./auth.css"

const Auth = (props) => {
    const [showLogin, setShowLogin]= useState(false); 

    function authToggle(){
      return showLogin ? 'register' : 'login'
    } 

    function handleToggle(){
        if(showLogin === false) {
          setShowLogin(true); 
        }else {setShowLogin(false)} 
        }

  return (
    <>
      {showLogin ? (
        <Login
          updateToken={props.updateToken}
          handleSwitch={handleToggle}
          updateCurrentId={props.updateCurrentId}
        />
      ) : (
        <Register
          updateToken={props.updateToken}
          handleSwitch={handleToggle}
          updateCurrentId={props.updateCurrentId} 

        />
      )}

    <div className="d-flex justify-content-center align-items-center">
    {/* <Login updateToken={props.updateToken} />  */}
    {/* <Register updateToken={props.updateToken} />  */}
    {/* <LoginButton title="Login/Register" onClick={handleToggle} />  */} 
    <Button onClick={handleToggle}>{authToggle()}</Button>
    </div>
    </>
  )}

export default Auth;