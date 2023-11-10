import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);

  function handleSwitch() {
    setIsLogin(!isLogin);
  }

  return (
    <>
      {isLogin ? (
        <Login
          updateToken={props.updateToken}
          handleSwitch={handleSwitch}
          updateCurrentId={props.updateCurrentId}
          updateIsAdmin={props.updateIsAdmin}
        />
      ) : (
        <Signup
          updateToken={props.updateToken}
          handleSwitch={handleSwitch}
          updateCurrentId={props.updateCurrentId}
          updateIsAdmin={props.updateIsAdmin}
        />
      )}
    </>
  );
}

export default Auth;
