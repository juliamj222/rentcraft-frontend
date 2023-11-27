import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Collapse,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler,
} from "reactstrap";
import { API_PAYMENTS_UPDATE, API_TENANTS_VIEW_ALL, API_TENANTS_VIEW_BY_ID, API_UNIT_VIEW_BY_ID, API_UNIT_VIEW_BY_USER } from "../constants/endpoints";
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

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed)

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled);
  }

  function navigateToUnitHistory() {
    navigate("/payments/unit/" + unit_id);
  }

  function navigateToTenantHistory() {
    navigate("/payments/tenant/" + tenant_id);
  }

  function navigateToPaymentEdit() {
    navigate("/payments/update/" + _id)
  }

  // functions to populate dropdowns
  const [unitData, setUnitData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [unitId, setUnitId] = useState(unit_id);
  const [tenantId, setTenantId] = useState(tenant_id);

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

  // Fetch Address
  const [thisAddress, setThisAddress] = useState([]);
  async function fetchAddress() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      // Send Request
      const response = await fetch(API_UNIT_VIEW_BY_ID + "/" + unit_id, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Set State
      setThisAddress(data.unit)

    } catch (error) {
      console.error(error);
    }
  }

  // Fetch Tennant
  const [thisTennant, setThisTennant] = useState([]);
  async function fetchTenant() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      // Send Request
      const response = await fetch(API_TENANTS_VIEW_BY_ID + "/" + tenant_id, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Set State
      setThisTennant(data.tenants)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchUnits();
    fetchTenants();
    fetchAddress();
    fetchTenant()
  }, [props.token]);

  if (!props.token) return <ReturnToAuth />;

  return (
    <>
      <Card
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: "5px",
        marginBottom: "5px"
      }}
      >
        <CardHeader style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--secondary)"
        }}>
          <h5>{date}</h5>
          <h5>Payment ID: {_id}</h5>
          <Navbar light>
            <NavbarToggler onClick={toggleNavbar} style={{background: "var(--primary)"}} />
            <Collapse isOpen={!collapsed} navbar>
              <Nav navbar style={{
                display: "flex",
                alignContent: "flex-end",
              }}>
                <NavItem>
                  <NavLink href='#' onClick={navigateToTenantHistory}>Tenant Payment History</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#' onClick={navigateToUnitHistory}>Unit Payment History</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#' onClick={navigateToPaymentEdit}>Edit Payment</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </CardHeader>
        <CardBody style={{
          display: "flex",
          justifyContent: "space-between",
          // height: "50px",
        }}>

          {/* Unit */}
          <CardText>ADDRESS: {thisAddress.address}</CardText>

          {/* Tenant */}
          <CardText>TENANT: {thisTennant.firstName} {thisTennant.lastName}</CardText>

          {/* Amount */}
          <CardText>Amount: {amount}</CardText>

          {/* Payment Status */}
          <CardText>Status: {paymentState}</CardText>

        </CardBody>
      </Card>
    </>
  );
}

export default PaymentsCard;
