import React, { useState, useEffect } from "react"; /* imrs */
import { useParams } from "react-router-dom"; 
import App from "../../App"; 
import ReturnToAuth from "./ReturnToAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import { Home, Folder, Message } from "@mui/icons-material";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
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
          Home
        </NavbarBrand>
        <NavbarBrand href="/auth"> Login / Signup </NavbarBrand>
        {/*         <NavItem>
          <NavLink href="/auth"> Login / Signup </NavLink>
        </NavItem> */}
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav
            navbar
            style={{
              display: "flex",
              //  flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <NavItem>
              <NavLink href={"/user/" + props.currentId}>Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/feed/" + props.currentId}>Units
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/tenants/view-all/" + props.currentId}>
                Tenants
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/payments/user/" + props.currentId}>
                Rent Payments
              </NavLink>
            </NavItem> 
            <NavItem>
            <Button onClick={props.clickLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
          <NavItem>
            <NavLink
              href="/auth"
              style={{
                color: "var(--tertiary)",
              }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={"/user/" + props.currentId}
              style={{
                color: "var(--tertiary)",
              }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={"/feed/" + props.currentId}
              style={{
                color: "var(--tertiary)",
              }}
            >
              Units
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={"/tenants/view-all/" + props.currentId}
              style={{
                color: "var(--tertiary)",
              }}
            >
              Tenants
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={"/payments/user/" + props.currentId}
              style={{
                color: "var(--tertiary)",
              }}
            >
              Payments
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
