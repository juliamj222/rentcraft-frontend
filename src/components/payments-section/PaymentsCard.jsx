import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Label,
} from "reactstrap";
import {
  API_PAYMENTS_UPDATE,
  API_TENANTS_VIEW_ALL,
  API_UNIT_VIEW_BY_USER,
} from "../constants/endpoints";
import { useNavigate } from "react-router-dom";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function PaymentsCard(props) {
  const { unit_id, tenant_id, amount, _id, date, paymentState } = props.payment;

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  // const [unitInput, setUnitInput] = useState(unit_id);

  const [editPaymentState, setEditPaymentState] = useState(paymentState);
  const [editDate, setEditDate] = useState(date);
  const [editAmount, setEditAmount] = useState(amount);

  const navigate = useNavigate();

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled);
  }

  function navigateToUnitHistory() {
    navigate("/payments/unit/" + unit_id);
  }

  function navigateToTenantHistory() {
    navigate("/payments/tenant/" + tenant_id);
  }

  // functions to populate dropdowns
  const [unitData, setUnitData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [unitId, setUnitId] = useState(unit_id);
  const [tenantId, setTenantId] = useState(tenant_id);

  const unitAddress = unitData.map((unit) => unit.address);
  const tenantFirstName = tenantData.map((tenant) => tenant.firstName);

  async function fetchUnits() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      // Send Request
      const response = await fetch(
        API_UNIT_VIEW_BY_USER + "/" + props.currentId,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      setUnitData(data.user_units);
      if (data.user_units.length > 0) {
        setUnitId(data.user_units[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTenants() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      // Send Request
      const response = await fetch(
        API_TENANTS_VIEW_ALL + "/" + props.currentId,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      setTenantData(data.user_tenants);
      if (data.user_tenants.length > 0) {
        setTenantId(data.user_tenants[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchUnits();
    fetchTenants();
  }, [props.token]);

  async function handleEdit() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      myHeaders.append("Content-type", "application/json");

      // Body
      const body = {
        amount: editAmount,
        date: editDate,
        paymentState: editPaymentState,
      };

      // Request Options
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(
        API_PAYMENTS_UPDATE + "/" + _id,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Refresh the feed
      props.fetchPaymentsFeed();

      // Change the edit mode to false
      setEditModeEnabled(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (!props.token) return <ReturnToAuth />;

  return (
    <>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Payment ID */}
          <CardTitle style={{ fontSize: "1.5em" }}>Payment ID: {_id}</CardTitle>

          {/* Unit ID */}
          {editModeEnabled ? (
            <>
              <Label for="selectUnit">Select Unit</Label>
              <Input
                id="selectUnit"
                name="selectUnit"
                type="select"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
              >
                {unitData.map((unit, index) => (
                  <option key={index} value={unit._id}>
                    {unit.address}
                  </option>
                ))}
              </Input>
            </>
          ) : (
            <CardText>ADDRESS</CardText>
          )}

          {/* Tenant ID */}
          {editModeEnabled ? (
            <>
              <Label for="selectTenant">Select Tenant</Label>
              <Input
                id="selectTenant"
                name="selectTenant"
                type="select"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
              >
                {tenantData.map((tenant, index) => (
                  <option key={index} value={tenant._id}>
                    {tenant.firstName} {tenant.lastName}
                  </option>
                ))}
              </Input>
            </>
          ) : (
            <CardText>TENANT NAME</CardText>
          )}
          {/* <CardText>Tenant ID: {tenant_id}</CardText> */}

          {/* Amount */}
          {editModeEnabled ? (
            <>
              <Label for="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </>
          ) : (
            <CardText>Amount: {amount}</CardText>
          )}

          {/* Date */}
          {editModeEnabled ? (
            <>
              <Label for="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </>
          ) : (
            <CardText>Date: {date}</CardText>
          )}

          {/* Payment Status */}
          {editModeEnabled ? (
            <>
              <Label for="paymentState">Payment Status</Label>
              <Input
                id="paymentState"
                type="select"
                value={editPaymentState}
                onChange={(e) => setEditPaymentState(e.target.value)}
              >
                <option>Full payment</option>
                <option>Partial payment</option>
                <option>Late payment</option>
                <option>Deposit</option>
                <option>Other</option>
              </Input>
            </>
          ) : (
            <CardText>Status: {paymentState}</CardText>
          )}

          {/*Toggle Edit Button */}
          {props.user_id === props.user?.user_id?._id && (
            <Button onClick={handleToggleEdit}>Edit Payment</Button>
          )}

          {/* Save Button in Edit Mode */}
          {editModeEnabled && (
            <Button color="warning" onClick={handleEdit}>
              SAVE EDITS
            </Button>
          )}

          {/* Unit Payment History */}
          {props.user_id === props.user?.user_id?._id && (
            <Button color="primary" onClick={navigateToUnitHistory}>
              Unit Payment History
            </Button>
          )}

          {/* Tenant Payment History */}
          {props.user_id === props.user?.user_id?._id && (
            <Button color="primary" onClick={navigateToTenantHistory}>
              Tenant Payment History
            </Button>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default PaymentsCard;
