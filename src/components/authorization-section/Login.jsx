import React, { useState } from "react"
import { Form, FormGroup, Label, Input } from "reactstrap" 
import { useNavigate } from "react-router-dom"
import { API_USER_LOGIN } from "../constants/endpoints" 
import LoginButton from "../../ui/LoginButton"


function Login(props) {
    const [email, setEmail] = useState("email@gmail.com");
    const [password, setPassword] = useState("password");
    const navigate = useNavigate();
    async function handleSubmit() { 
        
    try {
        // Headers
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        // Body
        const body = {
          email: email,
          password: password,
        };
  
        // Request Options
        const requestOption = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        };
  
        // Send Request
        const response = await fetch(API_USER_LOGIN, requestOption);
  
        //  Get A Response
        const data = await response.json();
  
        //   Update the token
        props.updateToken(data.token);
  
        //navigate to main page 
        navigate("/feed");
  
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
              style={{ width: "450px", height: "370px" }}
            >
              <h2 className="text-center font-primary bold">LOGIN FORM</h2>
              <Form>
                {/* Form Group Email */}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
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
                { <LoginButton title="Login" onClick={handleSubmit} />  }
              </Form>
            </div>
          </div>
        </>
      );
    }
    
    export default Login;