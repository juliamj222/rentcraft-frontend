import React from "react";
import { Button, Card, CardBody, CardTitle, CardText, Label } from "reactstrap";

function UnitDisplay(props) {
  const {
    user_id,
    tenant_id,
    address,
    city,
    state,
    zip,
    monthlyRent,
    unitState,
  } = props.unit;

  return (
    <div
      style={{
        background: "var(--secondary)",
        padding: "2%",
        marginLeft: "20%",
        marginRight: "20%",
        //    marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <Card
        style={{
          width: "100%",
        }}
      >
        <CardBody>
          <CardTitle name="address" style={{ fontSize: "1.5em" }}>
            {address}
          </CardTitle>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="city">City:</Label>
            <CardText className="city text-muted">{city}</CardText>
            <Label for="state">State:</Label>
            <CardText className="state text-muted">{state}</CardText>
            <Label for="zip">Zipcode:</Label>
            <CardText className="zip text-muted">{zip}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="monthlyRent">Monthly rent:</Label>
            <CardText className="monthlyRent text-muted">
              {monthlyRent}
            </CardText>
            <Label for="unitState">Unit state:</Label>
            <CardText className="unitState text-muted">{unitState}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="tenant_id">Tenant: </Label>
            <CardText className="tenant_id text-muted">{tenant_id}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="user_id">User:</Label>
            <CardText className="user_id text-muted">{user_id}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              href={"/feed/" + props.currentId}
              style={{
                background: "var(--quarternary)",
                width: "60%",
              }}
            >
              All units
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default UnitDisplay;
