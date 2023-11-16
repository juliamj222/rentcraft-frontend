import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState, useEffect } from "react";
import {
  API_PAYMENTS_CREATE,
  API_TENANTS_VIEW_ALL,
  API_UNIT_VIEW_BY_USER,
} from "../constants/endpoints";

function PaymentsCreate(props) {
  const [unit_id, setUnit_id] = useState("");
  const [tenant_id, setTenant_id] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentState, setPaymentState] = useState("");

  // functions to populate dropdown
  const [unitData, setUnitData] = useState([]);
  const [tenantData, setTenantData] = useState([]);

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
        setUnit_id(data.user_units[0]._id);
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
        setTenant_id(data.user_tenants[0]._id);
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

  async function handleSubmit() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      // Body
      let body = {
        unit_id: unit_id,
        tenant_id: tenant_id,
        date: date,
        amount: amount,
        paymentState: paymentState,
      };

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(API_PAYMENTS_CREATE, requestOptions);

      // Get a response
      const data = await response.json();

      // Refresh the payments feed
      props.fetchPaymentsFeed();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  if (!unit_id) return <h1>We don't have a unit registered</h1>;
  if (!tenant_id) return <h1>We don't have a tenant registered</h1>;

  return (
    <>
      <div>
        <h4>Create a payment</h4>

        <Form>
          {/* Select Unit */}
          <FormGroup>
            <Label for="selectUnit">Select Unit</Label>

            <Input
              id="selectUnit"
              name="selectUnit"
              type="select"
              value={unit_id}
              onChange={(e) => setUnit_id(e.target.value)}
              placeholder="Select unit"
            >
              {unitData.map((unit, index) => (
                <option key={index} value={unit._id}>
                  {unit.address}
                </option>
              ))}
            </Input>
          </FormGroup>

          {/* Select Tenant */}
          <FormGroup>
            <Label for="selectTenant">Select Tenant</Label>
            <Input
              id="selectTenant"
              name="selectTenant"
              type="select"
              // type="text"
              value={tenant_id}
              onChange={(e) => setTenant_id(e.target.value)}
            >
              {tenantData.map((tenant, index) => (
                <option key={index} value={tenant._id}>
                  {tenant.firstName} {tenant.lastName}
                </option>
              ))}
            </Input>
          </FormGroup>

          {/* Select Amount */}
          <FormGroup>
            <Label for="selectAmount">Enter $ Amount</Label>
            <Input
              id="selectAmount"
              name="selectAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></Input>
          </FormGroup>

          {/* Select Date */}
          <FormGroup>
            <Label for="selectDate">Select Date</Label>
            <Input
              id="selectDate"
              name="selectDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>

          {/* Select Payment State (Full, Partial etc.) */}
          <FormGroup>
            <Label for="selectPaymentState">Select Type of Payment</Label>

            <Input
              name="selectPaymentState"
              type="select"
              value={paymentState}
              onChange={(e) => setPaymentState(e.target.value)}
            >
              <option>Full payment</option>
              <option>Partial payment</option>
              <option>Late payment</option>
              <option>Deposit</option>
              <option>Other</option>
            </Input>
          </FormGroup>

          {/* Create Payment Button */}
          <Button onClick={handleSubmit}>Create Payment</Button>
        </Form>
      </div>
    </>
  );
}

export default PaymentsCreate;
