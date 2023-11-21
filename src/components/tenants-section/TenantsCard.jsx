import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
  Label,
} from "reactstrap";
import React, { useState } from "react";
import { API_TENANTS_UPDATE_BY_ID } from "../constants/endpoints";

function TenantsCard(props) {
  const params = useParams();
  // console.log(params)

  const { firstName, lastName, phone, email, _id, active } = props.tenant;

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [activeInput, setActiveInput] = useState("");

  function handleToggleEdit() {
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
        active: activeInput === "true" ? true : false,
      };

      // Request Options
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(
        API_TENANTS_UPDATE_BY_ID + "/" + _id,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Refresh the feed
      props.fetchTenants();

      // Change the edit mode to false
      setEditModeEnabled(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card
        style={{
          background: "var(--primary)",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "2%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <CardBody>
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
            <CardTitle tag="h5">
              {firstName} {lastName}
            </CardTitle>
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
              <Label for="active">KEEP tenant history?</Label>
              <Input
                name="active"
                type="select"
                value={activeInput}
                onChange={(e) => setActiveInput(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Input>
            </>
          ) : (
            <CardText></CardText>
          )}

          <CardText>Tenant ID: {_id}</CardText>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Toggle Edit Mode Button */}
            {props.userId === props.tenant?.user_id?._id && (
              <Button
                style={{
                  background: "var(--quarternary)",

                  margin: "auto",
                }}
                onClick={handleToggleEdit}
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
                onClick={handleEdit}
              >
                SAVE
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default TenantsCard;
