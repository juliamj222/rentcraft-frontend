//recently added 
//(dropdown to select a unit second dropdown to select a tenant) 
// import React, { useState, useEffect } from "react" 
import React, { useState, useEffect } from "react"; /* imrs */
import { useParams } from "react-router-dom"
import { 
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    NavLink, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
} from "reactstrap" 
import { 
    API_PAYMENTS_UNIT_HISTORY, 
    API_PAYMENTS_TENANT_HISTORY 
} from "../constants/endpoints" 

function Paymentparams(props) {
    const [collapsed, setCollapsed] = useState(true)
    const [unitDropdownOpen, setUnitDropdownOpen] = useState(false)
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false)

  const togglePaymentnav = () => setCollapsed(!collapsed) 
  const toggleUnitDropdown = () => setUnitDropdownOpen(!unitDropdownOpen)
  const toggleTenantDropdown = () => setTenantDropdownOpen(!tenantDropdownOpen)

  const params = useParams() 

  // Placeholder functions for handling unit and tenant selection
  const handleUnitSelect = (selectedUnit) => {
    // Implement logic for handling selected unit
    console.log("Selected Unit:", selectedUnit);
  };

  const handleTenantSelect = (selectedTenant) => {
    // Implement logic for handling selected tenant
    console.log("Selected Tenant:", selectedTenant);
  }; 

  return(
    <Navbar style={{
        background: "var(--tertiary)", 
        margintop: "5px", 
        marginbottom: "5px",
    }}
        >
      <NavbarBrand href="/">PaymentNavBar</NavbarBrand>
      <Nav className="me-auto font-primary" navbar> 
      <NavbarToggler onClick={togglePaymentnav} className="me-2" />
        <Collapse isOpen={!collapsed} navbar> 
        <Nav 
        navbar 
        style={{
            display: "flex", 
            justifyContent: "space-around", 
            alignItems: "flex-center", 
        }}
        >
        <NavItem>
        <NavLink href={"/payments/tenant/" + props.tenantId}>Payments By Tenant
        </NavLink> 
        </NavItem>
        <NavItem>
        <NavLink href={"/payments/unit/" + props.userId}>Payments By Unit
        </NavLink> 
        </NavItem>
        <NavItem>
              <Dropdown isOpen={unitDropdownOpen} toggle={toggleUnitDropdown}>
                <DropdownToggle caret>Select Unit</DropdownToggle>
                <DropdownMenu>
                  {/* Add options dynamically based on available units */}
                  <DropdownItem onClick={() => handleUnitSelect(props.unitId)}>
                    Unit1
                  </DropdownItem>

                  {/* Add more options as needed */}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            {/* Dropdown for selecting tenant */}
            <NavItem>
              <Dropdown isOpen={tenantDropdownOpen} toggle={toggleTenantDropdown}>
                <DropdownToggle caret>Select Tenant</DropdownToggle>
                <DropdownMenu>
                  {/* Add options dynamically based on available tenants */}
                  <DropdownItem onClick={() => handleTenantSelect(props.tenantId)}>
                    Tenant1
                  </DropdownItem>
                  {/* Add more options as needed */}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Nav>
    </Navbar>
  );
}

export default Paymentparams
