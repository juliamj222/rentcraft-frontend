import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";
import { API_UNIT_CREATE } from "../constants/endpoints";
/* import { API_UNIT_VIEW_ALL } from "../constants/endpoints"; */
import { useNavigate } from "react-router-dom";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function UnitCreate(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [unitState, setUnitState] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Create Unit Clicked");
    //trycatch

    try {
      //headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      //body
      const body = {
        address: address,
        city: city,
        state: state,
        zip: zip,
        monthlyRent: monthlyRent,
        unitState: unitState,
      };
      //request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      //send request
      const response = await fetch(API_UNIT_CREATE, requestOptions);
      //get a response
      const data = await response.json();
      // refresh the unit feed
      console.log(data);

      navigate("/feed/" + props.currentId);
    } catch (error) {
      console.error(error);
    }
  }
  if (!props.token) return <ReturnToAuth />;

  return (
    <>
      <div
        style={{
          background: "var(--primary)",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
          marginLeft: "20%",
          marginRight: "20%",
          marginBottom: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <h2
          className="text-center font-primary bold"
          style={{ paddingTop: "5%" }}
        >
          Register Your Unit
        </h2>
        <Form>
          {/* Form Group address */}
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="The address of the unit"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>
          {/* Form Group address ends */}
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
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setZip(numericValue);
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
                const numericValue = e.target.value.replace(/\D/g, "");
                setMonthlyRent(numericValue);
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
              value={unitState}
              onChange={(e) => setUnitState(e.target.value)}
            >
              <option>Vacant</option>
              <option>Rented</option>
              <option>Unavailable</option>
              <option>Under repairs</option>
            </Input>
          </FormGroup>
          {/* Form Group unitState ends */}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              className="button rounded"
              title="Create unit"
              style={{
                background: "var(--secondary)",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSubmit}
            >
              Register this unit
            </button>
            <Button
              href={"/feed/" + props.currentId}
              style={{
                background: "var(--quarternary)",
              }}
            >
              All units
            </Button>
          </div>
          {/* Buttons End */}
        </Form>
      </div>
    </>
  );
}

export default UnitCreate;
