import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Label,
  Input,
  Form,
  ButtonGroup,
  FormGroup,
} from "reactstrap";

function WelcomeIndex(props) {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/unit/create");
  };
  console.log(props.currentId);
  return (
    <>
      <div
        style={{
          background: "var(--primary)",
          padding: "10%",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: "5%",
          paddingBottom: "5%",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <CardTitle name="address">
          {" "}
          <h2
            className="text-center font-primary bold"
            style={{ paddingBottom: "5%" }}
          >
            Welcome
          </h2>
        </CardTitle>
        <CardText
          className="city text-muted"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          Welcome to RentCraft. Let's get you started!
        </CardText>
        {!props.currentId ? (
          <Button
            style={{
              background: "var(--quarternary)",
              marginBottom: "5%",
              width: "40%",
            }}
            href="/auth"
          >
            Register or Log in
          </Button>
        ) : (
          <Button
            style={{
              background: "var(--quarternary)",
              width: "30%",
            }}
            onClick={handleGetStarted}
          >
            Register Unit
          </Button>
        )}
      </div>
    </>
  );
}

export default WelcomeIndex;
