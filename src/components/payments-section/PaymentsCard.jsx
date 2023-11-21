import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Label,
} from "reactstrap";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function PaymentsCard(props) {
  const { unit_id, tenant_id, amount } = props.payment;

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [unitInput, setUnitInput] = useState(unit_id);

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled);
  }

  async function handleEdit() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      myHeaders.append("Content-type", "application/json");

      // Body
      const body = {};
    } catch (error) {
      console.error(error);
    }
  }

  if (!props.token) return <ReturnToAuth />;

  return (
    <div
      style={{
        background: "var(--secondary)",
        padding: "2%",
        borderRadius: "10px",
      }}
    >
      <Card>
        <CardBody
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Select Unit */}
          {editModeEnabled ? (
            <>
              <Label for="selectUnit">UNIT</Label>
              <Button
                id="selectUnit"
                type="button"
                data-toggle="dropdown"
                value={unitInput}
                onChange={(e) => setUnitInput(e.target.value)}
              />
            </>
          ) : (
            <div style={{ flex: 1 }}>
              <CardTitle>Unit ID: {unit_id}</CardTitle>
              <CardSubtitle>Tenant ID: {tenant_id}</CardSubtitle>
              <CardText>Amount: {amount}</CardText>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default PaymentsCard;
