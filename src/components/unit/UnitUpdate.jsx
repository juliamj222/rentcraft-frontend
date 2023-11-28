import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { 
  API_TENANTS_VIEW_ALL, 
  API_UNIT_UPDATE_BY_ID, 
  API_UNIT_DELETE_BY_ID, } from "../constants/endpoints";
import {  } from "../constants/endpoints"; 
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function UnitUpdate(props) {
  console.log(props);
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [tenant_id, setTenant_id] = useState(""); 
  const [tenantData, setTenantData] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [unitState, setUnitState] = useState("");
  const [active, setActive] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal); 

  // fetchAddress(data.unit.tenant_id) 


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
    fetchTenants();
  }, [props.token])

  async function handleSubmit() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      let body = {
        address: address, 
        city: city,
        state: state, 
        zip: zip,
        monthlyRent: monthlyRent,
        unitState: unitState, 
        tenant_id: tenant_id,
      };

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }; 

      // Send Request 
      const response = await fetch(API_UNIT_UPDATE_BY_ID, requestOptions) 

      // Get a response
      const data = await response.json();

      props.fetchTenants() 
      console.log(data) 
    } catch (error) {
      console.error(error)
    }
  } 
  if (!props.token) return <ReturnToAuth />;

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
        <FormGroup>
         <Label for="tenant_id">Tenant ID</Label>
          <Input
            type="select"
            name="tenant_id"
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
