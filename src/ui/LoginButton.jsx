import "./LoginButton.css";
function LoginButton(props) {
  return (
    <>
      <div className="Login-Button" onClick={props.onClick}>
        Login
      </div>
    </>
  );
}

export default LoginButton;
