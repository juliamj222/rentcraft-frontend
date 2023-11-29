//rsfc
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Label,
  Input,
  Form,
  FormGroup,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  API_TENANTS_VIEW_ALL,
  API_TENANTS_VIEW_BY_ID,
  API_UNIT_DELETE_BY_ID,
  API_UNIT_UPDATE_BY_ID,
  API_UNIT_VIEW_BY_ID,
} from "../constants/endpoints";
//imrs import usestate
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "../../ui/DeleteConfirmation";
import UnitUpdate from "./UnitUpdate.jsx";
import ReturnToAuth from "../navigation-section/ReturnToAuth.jsx";

// this function just toggles to the opposite, sets true to false etc

function UnitDisplayOrUnitEdit(props) {
  const params = useParams();
  console.log(params);
  const {
    user_id,
    tenant_id,
    address,
    city,
    state,
    zip,
    monthlyRent,
    unitState,
    _id,
    userId,
    active,
  } = props.unit;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [editModeEnabled, setEditModeEnabled] = useState(false);

  function handleToggleEdit() {
    console.log("Edit Toggle Works");
    if (editModeEnabled === true) {
      props.fetchUnitFeed();
    }
    setEditModeEnabled(!editModeEnabled);
  }

  // Fetch Unit
  const [thisUnit, setThisUnit] = useState([]);
  async function fetchUnit() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      // Send Request
      const response = await fetch(
        API_UNIT_VIEW_BY_ID + "/" + params.id,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      setThisUnit(data.unit);
    } catch (error) {
      console.error(error);
    }

    // Fetch Tenants
    // const [tenantData, setTenantData] = useState([]);
    // const [tenantId, setTenantId] = useState(tenant_id);
    // async function fetchTenants() {
    //   try {
    //     // Headers
    //     const myHeaders = new Headers();
    //     myHeaders.append("Authorization", props.token);

    //     // Request Options
    //     let requestOptions = {
    //       method: "GET",
    //       headers: myHeaders,
    //     };

    //     // Send Request
    //     const response = await fetch(
    //       API_TENANTS_VIEW_ALL + "/" + props.currentId,
    //       requestOptions
    //     );

    //     // Get a Response
    //     const data = await response.json();
    //     console.log(data);

    //     // Set State
    //     setTenantData(data.user_tenants);
    //     if (data.user_tenants.length > 0) {
    //       setTenantId(data.user_tenants[0]._id);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
  }

  // Fetch Tenant
  const [thisTenant, setThisTenant] = useState([]);
  async function fetchTenant() {
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
        API_TENANTS_VIEW_BY_ID + "/" + thisUnit.tenant_id,
        requestOptions
      );
      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      setThisTenant(data.tenants);
      console.log(data.tenants.firstName + " " + data.tenants.lastName);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchUnit();
    // fetchTenant();
  }, [props.token]);

  if (!props.token) return <ReturnToAuth />;

  function UnitDisplay() {
    return (
      <div
      // style={{
      //   background: "var(--secondary)",
      //   padding: "2%",
      //   marginLeft: "20%",
      //   marginRight: "20%",
      //   //    marginTop: "2%",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   borderRadius: "10px",
      // }}
      >
        <Card
          style={{
            width: "60%",
            display: "flex",
            marginLeft: "20%",
            marginTop: "1em",
            justifyContent: "center",
          }}
        >
          <CardHeader
            className="address"
            style={{
              fontSize: "1.5em",
              background: "var(--secondary)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {address}
          </CardHeader>
          <CardBody
            className="form-row"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              className="form-row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <Label for="city">City:</Label> */}
              <CardText>City: {city}</CardText>
              {/* <Label for="state">State:</Label> */}
              <CardText>State: {state}</CardText>
              {/* <Label for="zip">Zipcode:</Label> */}
              <CardText>Zipcode: {zip}</CardText>
            </div>
            <div
              className="form-row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <Label for="monthlyRent">Monthly rent:</Label> */}
              <CardText>Monthly Rent: ${monthlyRent}</CardText>
              {/* <Label for="unitState">Unit state:</Label> */}
              <CardText>Unit State: {unitState}</CardText>
              {/* <Label for="tenant_id">Tenant:</Label> */}

              <CardText>Tenant ID: {tenant_id}</CardText>
            </div>
            <div
              className="form-row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <Label for="tenant_id">Tenant: </Label> */}
              {/* <CardText>Tenant: {thisTennant.firstName} {thisTennant.lastName}</CardText> */}
              {/* <CardText>Tenant: {tenant_id}</CardText> */}
              {/* </div>
            <div
              className="form-row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            > */}
              {/* <Label for="user_id">User ID:</Label> */}
              {/* <CardText>User ID: {user_id}</CardText> */}
            </div>
          </CardBody>
          {/* <div
              className="form-row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            > */}
          <CardFooter
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              background: "var(--primary)",
            }}
          >
            <Button
              style={{
                background: "var(--quarternary)",
                width: "200px",
              }}
              onClick={handleToggleEdit}
            >
              Edit
            </Button>
            <Button
              href={"/feed/" + props.currentId}
              style={{
                background: "var(--quarternary)",
                width: "200px",
              }}
            >
              All units
            </Button>
          </CardFooter>
          {/* </div> */}
        </Card>
      </div>
    );
  }

  return editModeEnabled ? (
    <UnitUpdate
      token={props.token}
      unitId={props.unit._id}
      currentId={props.currentId}
      unit={props.unit}
      handleToggleEdit={handleToggleEdit}
    />
  ) : (
    <UnitDisplay />
  );
}

export default UnitDisplayOrUnitEdit;
