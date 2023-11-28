import { useParams } from "react-router-dom";
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
  API_UNIT_VIEW_BY_USER,
} from "../constants/endpoints";

function TenantsCard(props) {
  // console.log(params)
  const params = useParams();

  const { firstName, lastName, phone, email, _id, active } = props.tenant;

  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [activeInput, setActiveInput] = useState("");
  const [unitStateInput, setUnitStateInput] = useState("");

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
        unit_id: props.unit_id,
        active: activeInput === "true" ? true : false,
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
      fetchUnits();
    }
  }, [props.token]);

  return (
    <>
    <div className="cardContainer" style={{
      display: "flex",
      direction: "row",
      flexWrap: "wrap",
      // flexFlow: "row wrap",
      // width: "100%",
      justifyContent: "space-between"
    }}>

      <Card
        style={{
          // display: "flex",
          // flexDirection: "row",
          width: "400px",
          marginBottom: "20px",
          // flexWrap: "wrap"
          // marginLeft: "auto",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <CardHeader style={{
          fontSize: "1.5em",
          background: "var(--secondary)",
          display: "flex",
          justifyContent: "center"
        }}>
          {firstName} {lastName}
        </CardHeader>
        <CardBody style={{
          display: "flex",
          flexDirection: "column"
        }}>
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
              {/* {firstName} {lastName} */}
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
              <FormGroup>
                <Label for="unit-id">Unit Address</Label>
                <Input
                  name="unit-id"
                  type="select"
                  value={unit_id}
                  onChange={(e) => setUnit_id(e.target.value)}
                >
                  {unit_Data.map((unit, index) => (
                    <option key={index} value={unit._id}>
                      {unit.address}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </>
          ) : (
            <CardText>Unit Address</CardText>
          )}
          {/* <FormGroup className="col col-3.2">
              <Label for="unitState">State of the unit:</Label>
              <Input
                name="unitState"
                type="select"
                value={unitStateInput}
                onChange={(e) => setUnitStateInput(e.target.value)}
              >
                <option>Vacant</option>
                <option>Rented</option>
                <option>Unavailable</option>
                <option>Under repairs</option>
              </Input>
            </FormGroup> */}

          <CardText>Tenant ID: {_id}</CardText>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          > */}
            </CardBody>
            <CardFooter style={{
              background: "var(--primary)",
              display: "flex"
            }}>
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
                onClick={() => {
                  handleEdit();
                  console.log(lastNameInput, firstNameInput /* .user_id */);
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
