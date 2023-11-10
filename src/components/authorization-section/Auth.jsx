import Login from "./Login"; 
// import Signup from "./Signup";

function Auth(props) {
    return ( <>
    <h1>Hi from Auth</h1> 
    <Login updateToken={props.updateToken} /> 
     {/* <Signup updateToken={props.updateToken} /> */}
    </> );
}
 
export default Auth;