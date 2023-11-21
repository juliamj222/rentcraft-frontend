import React, { useState, useEffect } from "react"; /* imrs */
import { useParams } from "react-router-dom"; 
import App from "../../App"; 
import ReturnToAuth from "./ReturnToAuth";

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

  const toggleNavbar = () => setCollapsed(!collapsed);
  const params = useParams();

  return (
    <div>
      <Navbar
        style={{
          background: "var(--tertiary)",
        }}
      >
        <NavbarBrand
          href={"/feed/" + props.currentId}
          className="me-auto font-primary"
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
  );
}

export default Navigation;
