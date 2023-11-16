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
  FormGroup,
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
  // const currentId = props.user._id;

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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if (!props.unit) {
    return <div>Unit information not available</div>;
  }

  function handleView() {
    // Copy to clipboard
    navigate("/view-by-id/" + _id);
    navigator.clipboard.writeText("http://localhost:3000/feed/" + _id);
  }

  /*  function handleShare() {
    // Copy to clipboard
  
  } */

  // this function just toggles to the opposite, sets true to false etc
  function handleToggleEdit() {
    console.log("Edit Toggle Works");
    setEditModeEnabled(!editModeEnabled);
  }

  async function handleEdit() {
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
    // Request Options
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    // Send Request
    const response = await fetch(
      API_UNIT_UPDATE_BY_ID + "/" + _id,
      requestOptions
    );
    //  Get A Response
    const data = await response.json();
    console.log(data);
    // refresh the feed
    props.fetchUnitFeed();
    // change the edit mode to false
    setEditModeEnabled(false);
  }

  async function handleDelete() {
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
        API_UNIT_DELETE_BY_ID + "/" + _id,
        requestOptions
      );
      //  Get A Response
      const data = await response.json();
      console.log(data);
      // Refresh the feed
      props.fetchUnitFeed();
    } catch (error) {
      console.error(error);
    }
  }

  function EditModeForm() {
    return (
      <>
        <Label for="address">Address</Label>
        <Input
          id="address"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          className="mb-2"
          type="text"
        />

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
        <div
          className="form-row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FormGroup className="col col-3.2">
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
          <FormGroup className="col col-3.2">
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
          </FormGroup>

          {/* Form Group unitState ends */}
        </div>
        {/* Form Group tenant_id */}
        <FormGroup>
          <Label for="tenant_id">Tenant ID</Label>
          <Input
            type="tenant_id"
            name="tenant_id"
            id="tenant_id"
            placeholder="Tenant ID"
            value={tenant_idInput}
            onChange={(e) => setTenant_idInput(e.target.value)}
          />
        </FormGroup>

        {/* Form Group tenant id ends */}
        <div
          className="form-row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            style={{
              background: "var(--quarternary)",
            }}
            onClick={handleEdit}
          >
            Save
          </Button>

          <Button
            style={{
              background: "var(--quarternary)",
            }}
          >
            Take me back
          </Button>
        </div>
      </>
    );
  }

  function RegularView() {
    console.log(props.unit);
    return (
      <>
        <div>
          <CardTitle name="address">{address}</CardTitle>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="city">City:</Label>
            <CardText className="city text-muted">{city}</CardText>
            <Label for="state">State:</Label>
            <CardText className="state text-muted">{state}</CardText>
            <Label for="zip">Zipcode:</Label>
            <CardText className="zip text-muted">{zip}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="monthlyRent">Monthly rent:</Label>
            <CardText className="monthlyRent text-muted">
              {monthlyRent}
            </CardText>
            <Label for="unitState">Unit state:</Label>
            <CardText className="unitState text-muted">{unitState}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="tenant_id">Tenant: </Label>
            <CardText className="tenant_id text-muted">{tenant_id}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="user_id">User:</Label>
            <CardText className="user_id text-muted">{user_id}</CardText>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              href={"/unit/view-by-id/" + props.unit._id}
              style={{
                background: "var(--quarternary)",
                width: "20%",
              }}
            >
              Unit Display
            </Button>

            <Button
              style={{
                background: "var(--quarternary)",
                width: "20%",
              }}
              onClick={handleToggleEdit}
            >
              Edit
            </Button>
            <Button
              style={{
                background: "#860A35",
                width: "20%",
                color: "white",
              }}
              onClick={toggle}
            >
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  }
  return (
    //    {props.unit.user_id.includes(props.currentId)}
    <>
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
            {editModeEnabled ? EditModeForm() : RegularView()}
          </CardBody>
        </Card>
      </Form>
      <DeleteConfirmation
        modal={modal}
        toggle={toggle}
        address={address}
        id={_id}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default UnitCardF;
