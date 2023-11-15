import React, { useState, useEffect } from "react"; /* imrs */
import { useParams } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
              <NavLink href="/auth"> Login / Signup </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/feed/" + props.currentId}>
                View Your Units
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/user/" + props.currentId}>
                View Your Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/unit/create">Register a Unit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/tenants/" + props.currentId}>
                View Your Tenants
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/payments/" + props.currentId}>
                View Rent Payments
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
