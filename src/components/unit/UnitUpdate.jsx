import {
  /* Alert, */ Button,
  /* Card, */ Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  API_TENANTS_VIEW_ALL,
  API_UNIT_UPDATE_BY_ID,
  API_UNIT_DELETE_BY_ID,
} from "../constants/endpoints";
import {} from "../constants/endpoints";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function UnitUpdate(props) {
  const {
    address,
    city,
    state,
    zip,
    monthlyRent,
    unitState,
    active,
    tenant_id,
    _id,
  } = props.unit;
  console.log(props.unit);
  console.log(props.unit.tenant_id);
  /*   const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [user_id, setUser_id] = useState(""); */
  const [tenant_idInput, setTenant_idInput] = useState(tenant_id);
  const [tenantData, setTenantData] = useState([]);
  const [addressInput, setAddressInput] = useState(address);
  const [cityInput, setCityInput] = useState(city);
  const [stateInput, setStateInput] = useState(state);
  const [zipInput, setZipInput] = useState(zip);
  const [monthlyRentInput, setMonthlyRentInput] = useState(monthlyRent);
  const [unitStateInput, setUnitStateInput] = useState(unitState);
  const [activeInput, setActiveInput] = useState(active);
  const [modal, setModal] = useState(false);
  /*  const toggle = () => setModal(!modal); */

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
      /* if (data.user_tenants.length > 0) {
        setTenant_idInput(data.user_tenants[0]._id);
      } else {
        setTenant_idInput("No tenants assigned");
      } */
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    () => {
      if (!props.token) return;
      fetchTenants();
    } /*  [props.token] */
  );

  if (!props.token) return <ReturnToAuth />;

  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("handleEdit called");
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    // Body
    let body = {
      user_id: props.currentId,
      address: addressInput,
      city: cityInput,
      state: stateInput,
      zip: zipInput,
      monthlyRent: monthlyRentInput,
      unitState: unitStateInput,
      tenant_id: tenant_idInput,
      _id: props.unitId,
      active: activeInput === /* " */ true /* " */ ? true : false,
    };

    if (tenant_id) {
      body.tenant_id = tenant_idInput;
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

    // change the edit mode to false
    props.handleToggleEdit();
  };

  /* function to let users delete units, we decided against giving users that option, for safety. They can delete units from their portfolio */
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          background: "var(--primary)",
          marginLeft: "15%",
          marginRight: "15%",
          marginTop: "20px",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            id="address"
            value={addressInput}
            placeholder="Enter to change the address"
            onChange={(e) => setAddressInput(e.target.value)}
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
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="col col-3.2">
            <Label for="state">State</Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="col col-3.2">
            <Label for="zip">Zip</Label>
            <Input
              type="text"
              name="zip"
              id="zip"
              placeholder="Zipcode"
              value={zipInput}
              onChange={(e) => {
                setZipInput(e.target.value);
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
            value={monthlyRentInput}
            onChange={(e) => {
              setMonthlyRentInput(e.target.value);
            }}
          />
        </FormGroup>
        {/* Form Group monthlyRent ends */}
        {/* Form Group unitState */}
        <FormGroup>
          <Label for="unitState">State of the unit:</Label>

          <Input
            name="unitState"
            type="select"
            value={unitStateInput}
            onChange={(e) => setUnitStateInput(e.target.value)}
          >
            <option> </option>
            <option>Vacant</option>
            <option>Rented</option>
            <option>Unavailable</option>
            <option>Under repairs</option>
          </Input>
        </FormGroup>
        {/* Form Group unitState ends */}
        <FormGroup>
          <Label for="tenant_id">Tenant:</Label>
          <Input
            type="select"
            name="tenant_id"
            value={tenant_idInput}
            onChange={(e) => setTenant_idInput(e.target.value)}
          >
            <option value="No tenants assigned">No tenants assigned</option>
            {tenantData.map((tenant, index) => (
              <option key={index} value={tenant._id}>
                {tenant.firstName} {tenant.lastName}
              </option>
            ))}
          </Input>
        </FormGroup>

        {/* Form Group active starts */}
        <FormGroup className="col col-3.2">
          <Label for="active">
            In my portfolio?{" "}
            <div
              style={{
                color: "gray",
              }}
            >
              <i>
                {" "}
                Only select False if you want to remove this unit's information
                from your portfolio.
              </i>
            </div>
          </Label>
          <Input
            name="active"
            type="select"
            value={activeInput}
            onChange={(e) => setActiveInput(e.target.value)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </Input>
        </FormGroup>

        {/* Form Group active ends */}
        <Button
          style={{ background: "var(--quarternary)", width: "200px" }}
          onClick={(e) => {
            handleEdit(e);
          }}
        >
          Save
        </Button>
      </Form>
    </>
  );
}

export default UnitUpdate;
