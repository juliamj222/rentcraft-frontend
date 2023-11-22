import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  API_UNIT_DELETE_BY_ID,
  API_UNIT_UPDATE_BY_ID,
} from "../constants/endpoints";

function UnitUpdate(props) {
  console.log(props);
  const [editModeEnabled, setEditModeEnabled] = useState(false);

  const [userId, setUserId] = useState(props.unit.userId);
  const [user_id, setUser_id] = useState(props.unit.user_id);
  const [tenant_id, setTenant_id] = useState(props.unit.tenant_id);
  const [address, setAddress] = useState(props.unit.address);
  const [city, setCity] = useState(props.unit.city);
  const [state, setState] = useState(props.unit.state);
  const [zip, setZip] = useState(props.unit.zip);
  const [monthlyRent, setMonthlyRent] = useState(props.unit.monthlyRent);
  const [unitState, setUnitState] = useState(props.unit.unitState);
  const [active, setActive] = useState(props.unit.active);
  const [modal, setModal] = useState(false);
  /* 
  const [user_idInput, setUser_idInput] = useState(user_id);
  const [tenant_idInput, setTenant_idInput] = useState(tenant_id);
  const [addressInput, setAddressInput] = useState(address);
  const [cityInput, setCityInput] = useState(city);
  const [stateInput, setStateInput] = useState(state);
  const [zipInput, setZipInput] = useState(zip);
  const [monthlyRentInput, setMonthlyRentInput] = useState(monthlyRent);
  const [unitStateInput, setUnitStateInput] = useState(unitState);
  const [activeInput, setActiveInput] = useState(active); */

  const toggle = () => setModal(!modal);

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(typeof active);
    console.log("handleEdit called");
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    // Body
    let body = {
      user_id: props.currentId,
      address: address,
      city: city,
      state: state,
      zip: zip,
      monthlyRent: monthlyRent,
      unitState: unitState,
      _id: props.unitId,
      active: active === "true" ? true : false,
    };

    if (tenant_id) {
      body.tenant_id = tenant_id;
    }
    // Request Options
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    // Send Request
    const response = await fetch(
      API_UNIT_UPDATE_BY_ID + "/" + props.unitId,
      requestOptions
    );
    //  Get A Response
    const data = await response.json();
    console.log(data);
    // refresh the feed
    //  props.fetchUnitFeed();
    // change the edit mode to false
    props.handleToggleEdit();
  };

  async function handleDelete() {
    console.log("handleDelete called");
    if (props.userId === props.unit.user_id) console.log(props.user._id);
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      // Request Options
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
      // Send Request
      const response = await fetch(
        API_UNIT_DELETE_BY_ID + "/" + props._id,
        requestOptions
      );
      //  Get A Response
      const data = await response.json();
      console.log(data);
      // Refresh the feed
      //  props.fetchUnitFeed();
    } catch (error) {
      console.error(error);
    }
  }

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

        {/* Form Group active starts */}
        <FormGroup className="col col-3.2">
          <Label for="active">In my portfolio?</Label>
          <Input
            name="active"
            type="select"
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Input>
        </FormGroup>

        {/* Form Group active ends */}
        <Button color="success" onClick={handleEdit}>
          Save
        </Button>
      </Form>
    </>
  );
}

export default UnitUpdate;
