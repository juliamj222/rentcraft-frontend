import { NavLink } from "react-router-dom";
import { Container } from "reactstrap";

function ReturnToAuth(props) {
  return (
    <>
      <Container className="mt-5 text-center">
        <h1>You Must Login to View This Page</h1>
        <NavLink style={{ border: "1px solid black", 
        color: "black", 
        backgroundColor: "#c2dedc", 
        textDecoration: "none", 
        padding: "3px 12px", 
        borderRadius: "4px",
      }}
         to="/auth">Click To Login</NavLink>
      </Container>
    </>
  );
}

export default ReturnToAuth;
