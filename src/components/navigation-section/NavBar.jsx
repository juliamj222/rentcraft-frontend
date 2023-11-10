import React, { useState, useEffect } from "react"; /* imrs */

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar
        style={{
          background: "var(--tertiary)",
        }}
      >
        <NavbarBrand href="/" className="me-auto font-primary">
          RentCraft
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav
            navbar
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <NavItem>
              <NavLink href="/auth"> Login / Signup </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">View Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/unitcreate">Create Unit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">View Tenants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">View Payments</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
