import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { API_TENANTS_CREATE } from "../constants/endpoints";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function TenantsCreate(props) {
  /*   const params = useParams(); */

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      // Body
      let body = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      };

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(API_TENANTS_CREATE, requestOptions);

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Refresh the Tenants Feed
      props.fetchTenants();
    } catch (error) {
      console.error(error);
    }
  }

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
          marginTop: "2%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <h2
          className="font-primary text-center"
          style={{ paddingBottom: "5%", marginTop: "5%" }}
        >
          Create a tenant
        </h2>
        <Form>
          {/* first name, last name, phone, email */}

          {/* first name */}
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>

          {/* last name */}
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>

          {/* phone */}
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>

          {/* email */}
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          {/* Submit Button */}
          <div
            style={{
              background: "var(--secondary)",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                background: "var(--secondary)",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSubmit}
            >
              Create Tenant
            </Button>
            <Button
              href={"/tenants/view-all/" + props.tenant_id}
              style={{
                background: "var(--quarternary)",
              }}
            >
              All tenants
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default TenantsCreate;
