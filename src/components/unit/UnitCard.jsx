//rsfc
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Label,
  Input,
  Form,
  ButtonGroup,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  API_UNIT_DELETE_BY_ID,
  API_UNIT_UPDATE_BY_ID,
} from "../constants/endpoints";
//imrs import usestate
import React, { useState } from "react";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

function UnitCardF(props) {
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
  } = props.unit;
  const navigate = useNavigate();
  //usf usestate
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [user_idInput, setUser_idInput] = useState(user_id);
  const [tenant_idInput, setTenant_idInput] = useState(tenant_id);
  const [addressInput, setAddressInput] = useState(address);
  const [cityInput, setCityInput] = useState(city);
  const [stateInput, setStateInput] = useState(state);
  const [zipInput, setZipInput] = useState(zip);
  const [monthlyRentInput, setMonthlyRentInput] = useState(monthlyRent);
  const [unitStateInput, setUnitStateInput] = useState(unitState);

  /*  const [removeSwitch, setRemoveSwitch] = useState(false); */
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function handleView() {
    // Copy to clipboard
    navigate("/view-by-id/" + _id);
  }

  // this function just toggles to the opposite, sets true to false etc
  function handleToggleUpdate() {
    console.log("Edit Toggle Works");
    setEditModeEnabled(!editModeEnabled);
  }

  async function handleUpdate() {
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");
    // Body
    const body = {
      user_id: user_idInput,
      tenant_id: tenant_idInput,
      address: addressInput,
      city: cityInput,
      state: stateInput,
      zip: zipInput,
      monthlyRent: monthlyRentInput,
      unitState: unitStateInput,
      _id: _id,
    };
    // Request options
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    // Send request
    const response = await fetch(
      API_UNIT_UPDATE_BY_ID + "/" + _id,
      requestOptions
    );
    // Get a response
    const data = await response.json();
    console.log(data);
    // refresh the feed
    props.fetchUnitFeed();
    // change the edit mode to false
    setEditModeEnabled(false);
  }

  async function handleDelete() {
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
      const response = await fetch(API_UNIT_DELETE_BY_ID + _id, requestOptions);
      //  Get A Response
      const data = await response.json();
      console.log(data);
      // Refresh the feed
      props.fetchUnitFeed();
      toggle();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      (
      <Form>
        <Card
          className="mb-3 mt-3"
          style={{
            width: "100%",
            backgroundColor: "var(--backgroundColor)",
            color: "var(--tritary)",
          }}
        >
          <CardBody>
            <>
              <Label for="address">Address</Label>
              <Input
                id="address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="mb-2"
              />

              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {props.unit?.addedUsers?.firstName}
                {editModeEnabled ? (
                  <>
                    <Label
                      for="switch"
                      style={{ marginLeft: "3px", color: "var(--tritary)" }}
                    >
                      {" "}
                      Remove?
                    </Label>
                  </>
                ) : null}
              </CardSubtitle>
              {editModeEnabled ? (
                <>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    className="mb-2"
                    type="text"
                  />
                </>
              ) : (
                <CardText>{city}</CardText>
              )}
              <ButtonGroup className="my-2 d-flex justify-content-center">
                <Button
                  onClick={handleView}
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                >
                  View Unit
                </Button>
                {props.unit.userId ? (
                  <div>
                    {/* delete button */}
                    <Button
                      color=""
                      style={{ border: "1px solid black" }}
                      onClick={toggle}
                    >
                      Delete
                    </Button>

                    {/* update button */}
                    <Button
                      color=""
                      style={{ border: "1px solid black" }}
                      onClick={handleToggleUpdate}
                    >
                      {editModeEnabled ? "Cancel" : "Update"}
                    </Button>
                    {/* save button, if editmode is enabled... && */}
                    {editModeEnabled && (
                      <Button
                        color="success"
                        style={{ border: "1px solid black" }}
                        onClick={handleUpdate}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                ) : null}
              </ButtonGroup>
            </>
          </CardBody>
        </Card>
      </Form>
      ) : null}
      <DeleteConfirmation
        modal={modal}
        toggle={toggle}
        address={address}
        function={handleDelete}
      />
    </>
  );
}

export default UnitCardF;
