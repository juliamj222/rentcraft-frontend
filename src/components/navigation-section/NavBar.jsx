import React, { useState, useEffect } from "react"; /* imrs */
import { useParams } from "react-router-dom"; 
import App from "../../App"; 
import ReturnToAuth from "./ReturnToAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

// import { Home, Folder, Message } from "@mui/icons-material";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink, 
  Button,
} from "reactstrap";
import { API_UNIT_VIEW_BY_USER } from "../constants/endpoints";

function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);
  const params = useParams();

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar
      style={{
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <NavbarToggler
        onClick={toggleNavbar}
        className="me-2"
        style={{
          background: "var(--tertiary)",
        }}
      />

      <Collapse isOpen={!collapsed} navbar>
        <Nav
          navbar
          className="ml-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            paddingLeft: "3%",
          }}
        >
          <NavItem>
            <NavLink
              to="/auth"
              style={{
                color: "var(--tertiary)",
                textDecoration: "none"
              }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={"/user/" + props.currentId}
              style={{
                color: "var(--tertiary)",
                textDecoration: "none"
              }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={"/feed/" + props.currentId}
              style={{
                color: "var(--tertiary)",
                textDecoration: "none"
              }}
            >
              Units
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={"/tenants/view-all/" + props.currentId}
              style={{
                color: "var(--tertiary)",
                textDecoration: "none"
              }}
            >
              Tenants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={"/payments/user/" + props.currentId}
              style={{
                color: "var(--tertiary)",
                textDecoration: "none"
              }}
            >
              Payments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={props.clickLogout} to="/auth" style={{color: "var(--tertiary)", textDecoration: "none"}}>Logout</NavLink>
            {/* <Button onClick={props.clickLogout}>Logout</Button> */}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
