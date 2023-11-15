import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import LoginButton from "../../ui/LoginButton";
import { API_USER_REGISTER } from "../constants/endpoints";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const [email, setEmail] = useState("email@gmail.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    // try catch
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Body
      const body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      // Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(API_USER_REGISTER, requestOptions);

      // Get A Response
      const data = await response.json();

      // Update the token
      props.updateToken(data.token);
      // Navigate to the main page
      navigate("/unit/view-by-user/:id");

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="secondary-background p-5 rounded"
          style={{
            width: "450px",
            // ! increase pixel height
            height: "500px",
          }}
        >
          <h2 className="text-center font-primary bold">Register</h2>
          <Form>
            {/* Form Group First Name */}
            <FormGroup>
              <Label for="exampleFirstName">First Name</Label>
              <Input
                id="exampleFirstName"
                name="firstName"
                placeholder="Enter First Name"
                type="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            {/* Form Group First Name Ending*/}
            {/* Form Group Last Name */}
            <FormGroup>
              <Label for="exampleLastName">Last Name</Label>
              <Input
                id="exampleLastName"
                name="lastName"
                placeholder="Enter Last Name"
                type="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Last Name Ending */}
            {/* Form Group Email */}
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Enter Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Email Ending */}
            {/* Form Group Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Password Ending */}
            {/* <LoginButton title="Register" onClick={handleSubmit} /> */}
            <button onClick={handleSubmit} className="LoginButton">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
