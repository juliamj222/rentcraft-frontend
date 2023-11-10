import { Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";
import { API_UNIT_CREATE } from "../constants/endpoints";

function UnitCreate(props) {
  const [user_id, setUser_id] = useState("");
  const [tenant_id, setTenant_id] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [unitState, setUnitState] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Create Unit Clicked");
    //trycatch
    try {
      //headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      //body
      const body = {
        /*    user_id: user_id, */
        tenant_id: tenant_id,
        address: address,
        city: city,
        state: state,
        zip: zip,
        monthlyRent: monthlyRent,
        unitState: unitState,
      };
      //request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      //send request
      const response = await fetch(API_UNIT_CREATE, requestOptions);
      //get a response

      // refresh the unit feed
      props.fetchUnitFeed();
      props.handleSwitchUnits();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div
        className="d-flex neutral-background rounded p-5 m-2 flex-column"
        style={{ background: "var(--secondary)" }}
      >
        <h2 className="font-primary text-center">Register Your Unit</h2>
        <Form>
          {/* user_id tenant_id address city state zip monthlyRent unitState */}
          {/* Form Group address */}
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="The address of the unit"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          {/* Form Group address ends */}
          {/* Form Group city */}
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormGroup>
          {/* Form Group city ends */}
          {/* Form Group state */}
          <FormGroup>
            <Label for="state">State</Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </FormGroup>
          {/* Form Group state ends */}
          {/* Form Group zip */}
          <FormGroup>
            <Label for="zip">Zip</Label>
            <Input
              type="text"
              name="zip"
              id="zip"
              placeholder="Zipcode"
              value={zip}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setZip(numericValue);
              }}
            />
          </FormGroup>
          {/* Form Group zip ends */}
          {/* Form Group monthlyRent */}
          <FormGroup>
            <Label for="monthlyRent">Monthly Rent</Label>
            <Input
              type="text"
              name="monthlyRent"
              id="monthlyRent"
              placeholder="Expected monthly rent"
              value={monthlyRent}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, "");
                setMonthlyRent(numericValue);
              }}
            />
          </FormGroup>
          {/* Form Group monthlyRent ends */}
          {/* Form Group unitState */}
          <FormGroup>
            <Label for="unitState">State of the unit:</Label>
            <Input
              type="text"
              name="unitState"
              id="unitState"
              placeholder="Is the unit rented, vacant, or unavailable?"
              value={unitState}
              onChange={(e) => setUnitState(e.target.value)}
            />
          </FormGroup>
          {/* Form Group unitState ends */}
          {/* Form Group information */}
          <FormGroup>
            <Label for="tenant_id">Tenant ID</Label>
            <Input
              type="tenant_id"
              name="tenant_id"
              id="tenant_id"
              placeholder="Tenant ID"
              value={tenant_id}
              onChange={(e) => setTenant_id(e.target.value)}
            />
          </FormGroup>
          {/* Form Group city ends */}
          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              className="button rounded"
              onClick={props.handleSwitchUnits}
            >
              Change to View Units
            </button>
            <button
              className="button rounded"
              title="Create unit"
              onClick={handleSubmit}
            >
              Create Unit
            </button>
          </div>
          {/* Buttons End */}
        </Form>
      </div>
    </>
  );
}

export default UnitCreate;