import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import {
  API_TENANTS_UPDATE_BY_ID,
  API_TENANTS_VIEW_ALL,
  API_UNIT_VIEW_BY_USER,
} from "../constants/endpoints";
import TenantsFeed from "./TenantsFeed";
import TenantsCreate from "./TenantsCreate";
import fetchTenants from "./TenantsFeed";
import tenantsList from "./TenantsFeed";

function TenantsCard(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { firstName, lastName, phone, email, _id, active } = props.tenant;
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [navigationComplete, setNavigationComplete] = useState(false);

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [activeInput, setActiveInput] = useState(active);
  //  const [unitStateInput, setUnitStateInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tenantUpdated, setTenantUpdated] = useState(false);

  function TenantUpdated() {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
      setVisible(false);
      window.location.reload();
    };

    return (
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Tenant Updated! CLOSE this banner to see the updates.
      </Alert>
    );
  }

  function handleToggleEdit() {
    console.log("Edit Toggle Works");

    setEditModeEnabled(!editModeEnabled);
  }

  async function handleEdit() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      myHeaders.append("Content-Type", "application/json");

      // Body
      const body = {
        firstName: firstNameInput,
        lastName: lastNameInput,
        phone: phoneInput,
        email: emailInput,
        unit_id: props.unit_id,
        active: activeInput === /* " */ true /* " */ ? true : false,
      };

      // Make API request to update tenant information
      const response = await fetch(API_TENANTS_UPDATE_BY_ID + "/" + _id, {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      console.log("Update Response Status:", response.status);

      if (response.ok) {
        // Handle successful update, if needed
        console.log("Tenant information updated successfully");
        setTenantUpdated(true);

        // Update state with new values
        setFirstNameInput(body.firstName);
        setLastNameInput(body.lastName);
        setPhoneInput(body.phone);
        setEmailInput(body.email);
        setActiveInput(body.active);

        // Set showAlert to true after successful update
        setShowAlert(true);

        // Toggle off edit mode
        setEditModeEnabled(false);
        fetchUnits();
        setUpdateTrigger(false);
        setTenantUpdated(false);
        //     navigate(`/tenants/view-all/${props.currentId}`);
      } else {
        // Handle errors
        console.error("Failed to update tenant information");
        const errorData = await response.json().catch(() => {}); // Handle non-JSON error response
        console.error("Error Details:", errorData); // Log detailed error information
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [unit_Data, setUnit_Data] = useState([]);
  const [unit_id, setUnit_id] = useState("");
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
      setUnit_Data(data.user_units);
      //console.log(unit_Data)
      if (data.user_units.length > 0) {
        setUnit_id(data.user_units[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (props.token) {
      const fetchData = async () => {
        try {
          await fetchUnits();
          //   navigate(`/tenants/view-all/${props.currentId}`);
          setNavigationComplete(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [props.token, props.currentId, updateTrigger]);

  useEffect(() => {
    if (navigationComplete) {
      navigate(`/tenants/view-all/${props.currentId}`);
      setNavigationComplete(false);
    }
  }, [navigationComplete, navigate, props.currentId]);

  return (
    <>
      {showAlert === true && <TenantUpdated />}
      <div
        className="cardContainer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Card
          style={{
            margin: "0 10px 20px 0",
          }}
        >
          <CardHeader
            style={{
              fontSize: "1.5em",
              background: "var(--secondary)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {firstName} {lastName}
          </CardHeader>
          <CardBody
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Edit first and last name */}
            {editModeEnabled ? (
              <>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={firstNameInput}
                  onChange={(e) => setFirstNameInput(e.target.value)}
                />
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={lastNameInput}
                  onChange={(e) => setLastNameInput(e.target.value)}
                />
              </>
            ) : (
              <CardTitle tag="h5">{/* {firstName} {lastName} */}</CardTitle>
            )}

            {/* Edit phone */}
            {editModeEnabled ? (
              <>
                <Label for="phone">Phone Number</Label>
                <Input
                  type="text"
                  id="phone"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                />
              </>
            ) : (
              <CardText>Phone: {phone}</CardText>
            )}

            {/* Edit email */}
            {editModeEnabled ? (
              <>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </>
            ) : (
              <CardText>Email: {email}</CardText>
            )}

            {/* edit active */}
            {editModeEnabled ? (
              <>
                <FormGroup>
                  <Label for="active">
                    In my portfolio?
                    <div
                      style={{
                        color: "gray",
                      }}
                    >
                      <i>
                        {" "}
                        Only select False if you want to remove this tenant's
                        information from your portfolio.
                      </i>
                    </div>
                  </Label>
                  <Input
                    name="active"
                    type="select"
                    value={activeInput}
                    onChange={(e) => setActiveInput(e.target.value)} //!
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Input>
                </FormGroup>
              </>
            ) : (
              <CardText>Tenant information saved to my portfolio</CardText>
            )}

            <CardText>Tenant ID: {_id}</CardText>
          </CardBody>
          <CardFooter
            style={{
              background: "var(--primary)",
              display: "flex",
            }}
          >
            {/* Toggle Edit Mode Button */}
            {props.userId === props.tenant?.user_id?._id && (
              <Button
                style={{
                  background: "var(--quarternary)",
                  margin: "auto",
                }}
                onClick={() => {
                  handleToggleEdit();
                  setUpdateTrigger(false);
                  setTenantUpdated(false);
                  setShowAlert(false);
                }}
              >
                Edit Mode
              </Button>
            )}

            {/* Save Button in Edit Mode */}
            {editModeEnabled && (
              <Button
                style={{
                  background: "var(--quarternary)",
                  margin: "auto",
                }}
                onClick={() => {
                  handleEdit();
                  console.log(lastNameInput, firstNameInput, activeInput);
                  console.log("activeInput:", activeInput);

                  setShowAlert(true);
                  setShowAlert(false);
                  setLastNameInput(lastNameInput);
                  navigate(`/tenants/view-all/${props.currentId}`);
                }}
              >
                SAVE
              </Button>
            )}

            {/* </div> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default TenantsCard;
