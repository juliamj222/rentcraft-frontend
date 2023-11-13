import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";

function UnitUpdate(props) {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [tenant_id, setTenant_id] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [unitState, setUnitState] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Form>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            id="address"
            value={address}
            placeholder="Enter to change the address"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
          />
        </FormGroup>
        <div
          className="form-row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FormGroup className="col  col-3.2">
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

          <FormGroup className="col col-3.2">
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

          <FormGroup className="col col-3.2">
            <Label for="zip">Zip</Label>
            <Input
              type="text"
              name="zip"
              id="zip"
              placeholder="Zipcode"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
          </FormGroup>
        </div>
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
              setMonthlyRent(e.target.value);
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
        <Button color="success">Save</Button>
      </Form>
    </>
  );
}

export default UnitUpdate;
