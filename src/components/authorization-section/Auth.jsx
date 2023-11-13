import { useState } from "react"
import LoginButton from "../../ui/LoginButton";
import Login from "./Login"
import Register from "./Register" 

const Auth = (props) => {
    const [showLogin, setShowLogin]= useState(false); 

    function handleToggle(){
        if(showLogin === false) {
          setShowLogin(true); 
        }else {setShowLogin(false)} 
        }

  return (
    <>
      {isLogin ? (
        <Login
          updateToken={props.updateToken}
          handleSwitch={handleSwitch}
          updateCurrentId={props.updateCurrentId}
        />
      ) : (
        <Signup
          updateToken={props.updateToken}
          handleSwitch={handleSwitch}
          updateCurrentId={props.updateCurrentId}
        />
      )}
    </>
  );
}

    <div className="d-flex justify-content-center align-items-center">
    {/* <Login updateToken={props.updateToken} />  */}
    {/* <Register updateToken={props.updateToken} />  */}
    <LoginButton title="Login/Register" onClick={handleToggle} /> 
    </div>
    </> 
    );
}
 
export default Auth;