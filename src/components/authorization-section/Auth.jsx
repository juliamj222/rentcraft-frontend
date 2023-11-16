import { useState } from "react";
import LoginButton from "../../ui/LoginButton";
import Login from "./Login";
import Register from "./Register";
import { Button } from "reactstrap";
import "./auth.css";

const Auth = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  function authToggle() {
    return showLogin ? "Click to register" : "Click to log in";
  }

  function handleToggle() {
    if (showLogin === false) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        {/* <Login updateToken={props.updateToken} />  */}
        {/* <Register updateToken={props.updateToken} />  */}
        {/* <LoginButton title="Login/Register" onClick={handleToggle} />  */}
        <Button
          onClick={handleToggle}
          style={{
            background: "var(--secondary)",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "1%",
            paddingBottom: "1%",
            color: "black",
            marginTop: "1%",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          {authToggle()}
        </Button>
      </div>

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
    </>
  );
};

export default Auth;
