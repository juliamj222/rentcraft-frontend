import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { API_TENANTS_VIEW_ALL, API_UNIT_VIEW_BY_USER } from "../constants/endpoints";
import { useNavigate } from "react-router-dom";


function PaymentsDropdown(props) {

    // Destructure Properties
    const { unit_id, tenant_id, _id } = props.paymentsFeedItem

    // Navigate
    const navigate = useNavigate()

    function navigateToUnitHistory() {
        navigate("/payments/unit/" + unitId)
    }

    function navigateToTenantHistory() {
        navigate("/payments/tenant/" + tenantId)
    }

    // Fetch Units
    const [unitData, setUnitData] = useState([]);
    const [unitId, setUnitId] = useState(unit_id);

    async function fetchUnits() {
        try {

            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders,
            }

            // Send Request
            const response = await fetch(API_UNIT_VIEW_BY_USER + "/" + props.currentId, requestOptions)

            // Get a Response
            const data = await response.json()
            console.log(data)

            // Set State
            setUnitData(data.user_units)
            if (data.user_units.length > 0) {
                setUnitId(data.user_units[0]._id)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch Tenants
    const [tenantData, setTenantData] = useState([]);
    const [tenantId, setTenantId] = useState(tenant_id);

    async function fetchTenants() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "Get",
                headers: myHeaders,
            }

            // Send Request
            const response = await fetch(API_TENANTS_VIEW_ALL + "/" + props.currentId, requestOptions)

            // Get a Response
            const data = await response.json()
            console.log(data)

            // Set State
            setTenantData(data.user_tenants)
            if (data.user_tenants.length > 0) {
                setTenantId(data.user_tenants[0]._id)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUnits();
        fetchTenants();
    }, [props.token]);
  return (
    <>
        <Container fluid style={{maxWidth: "100%", padding: "0"}} >
            <Row
            style={{
                background: "var(--tertiary)",
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                // alignItems: "center",
                alignContent: "stretch",
                margin: "0",
                padding: "0",
            }}
            >
                <Col md="5" style={{display: "flex"}}>
                    {/* <Label for="selectUnit">View by unit:</Label> */}
                    <Input 
                    id="selectUnit" 
                    name="selectUnit"
                    type="select"
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    >
                        {unitData.map((unit, index) => (
                            <option key={index} value={unit._id}>{unit.address}</option>
                        ))}
                    </Input>
                    <Button onClick={navigateToUnitHistory}>View Unit Payment History</Button>
                </Col>
                <Col md="5" style={{display: "flex"}}>
                    {/* <Label>View by tenant:</Label> */}
                    <Input 
                    id="selectTenant" 
                    name="selectTenant"
                    type="select"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    >
                        {tenantData.map((tenant, index) => (
                            <option key={index} value={tenant._id}>
                                {tenant.firstName} {tenant.lastName}
                            </option>
                        ))}
                    </Input>
                    <Button onClick={navigateToTenantHistory}>View Tenant Payment History</Button>
                </Col>
                <Col md="2">
                    <Button>Register a new payment</Button>
                </Col>
            </Row>
        </Container>
    </>
  );
}


export default PaymentsDropdown;