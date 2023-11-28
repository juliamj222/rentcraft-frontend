import { Button, Col, Container, Dropdown, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_CREATE, API_TENANTS_VIEW_ALL, API_UNIT_VIEW_BY_USER } from "../constants/endpoints";
import { useNavigate } from "react-router-dom";
import ReturnToAuth from "../navigation-section/ReturnToAuth";


function PaymentsDropdown(props) {

    // Destructure Properties
    // const { unit_id, tenant_id, _id } = props.paymentsFeedItem

    // Navigate
    const navigate = useNavigate()

    function navigateToUnitHistory() {
        navigate("/payments/unit/" + unit_id)
    }

    function navigateToTenantHistory() {
        navigate("/payments/tenant/" + tenant_id)
    }

    // Modal for Payment Create
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal)

    // Fetch Units
    const [unitData, setUnitData] = useState([]);
    const [unit_id, setUnit_id] = useState("");

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
                setUnit_id(data.user_units[0]._id)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch Tenants
    const [tenantData, setTenantData] = useState([]);
    const [tenant_id, setTenant_id] = useState("");

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
                setTenant_id(data.user_tenants[0]._id)
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

    // Create new payment
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [paymentState, setPaymentState] = useState("");

    async function handleSubmit() {
        try {
            // console.log("Submit button works")
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("Authorization", props.token)

            // Body
            let body = {
                unit_id: unit_id,
                tenant_id: tenant_id,
                date: date,
                amount: amount,
                paymentState: paymentState
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            }

            // Send Request
            const response = await fetch(API_PAYMENTS_CREATE, requestOptions)

            // Get a response
            const data = await response.json()
            console.log(data)

            // Refresh the payments feed
            props.fetchPaymentsFeed()

            // Toggle Modal
            toggle()

        } catch (error) {
            console.error(error);
        }
    }

    if (!props.token) return <ReturnToAuth />

  return (
    <>
        <Container fluid style={{maxWidth: "100%", padding: "0", display: "flex", flexDirection: "row"}} >
            <Row
            style={{
                background: "var(--tertiary)",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "stretch",
                margin: "0",
                padding: "0",
            }}
            >
                <Col style={{display: "flex"}}>
                    {/* <Label for="selectUnit">View by unit:</Label> */}
                    <Input 
                    id="selectUnit" 
                    name="selectUnit"
                    type="select"
                    value={unit_id}
                    onChange={(e) => setUnit_id(e.target.value)}
                    >
                        {unitData.map((unit, index) => (
                            <option key={index} value={unit._id}>{unit.address}</option>
                        ))}
                    </Input>
                    <Button onClick={navigateToUnitHistory}>View</Button>
                </Col>
                <Col style={{display: "flex"}}>
                    {/* <Label>View by tenant:</Label> */}
                    {/* <FormGroup floating style={{display: "flex"}}> */}
                    <Input
                    id="selectTenant" 
                    name="selectTenant"
                    type="select"
                    value={tenant_id}
                    onChange={(e) => setTenant_id(e.target.value)}
                    // onClick={navigateToTenantHistory}
                    >
                        {tenantData.map((tenant, index) => (
                            <option key={index} value={tenant._id}>
                                {tenant.firstName} {tenant.lastName}
                            </option>
                        ))}
                    </Input>
                    {/* <Label for="selectTenant">
                        Select unit to view payment history
                    </Label> */}
                    {/* </FormGroup> */}
                    <Button onClick={navigateToTenantHistory}>View</Button>
                </Col>
                <Col md="2" style={{display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center"}}>
                    <Button onClick={toggle}>Log Payment</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader style={{ background: "var(--secondary)"}} toggle={toggle}>Log New Payment</ModalHeader>
                            <ModalBody>
                                <Dropdown>
                                    <Form>

                                        {/* Select Unit */}
                                        <FormGroup floating>
                                            <Input 
                                            id="selectUnit"
                                            name="selectUnit"
                                            type="select"
                                            value={unit_id}
                                            onChange={(e) => setUnit_id(e.target.value)}
                                            >
                                                {unitData.map((unit, index) => (
                                                    <option key={index} value={unit._id}>
                                                        {unit.address}
                                                    </option>
                                                ))}
                                            </Input>
                                            <Label for="selectUnit">
                                                Select Unit
                                            </Label>
                                        </FormGroup>

                                        {/* Select Tenant */}
                                        <FormGroup floating>
                                            <Input 
                                            id="selectTenant"
                                            name="selectTenant"
                                            type="select"
                                            value={tenant_id}
                                            onChange={(e) => setTenant_id(e.target.value)}
                                            >
                                                {tenantData.map((tenant, index) => (
                                                    <option key={index} value={tenant._id}>
                                                        {tenant.firstName} {tenant.lastName}
                                                    </option>
                                                ))}
                                            </Input>
                                            <Label for="selectTenant">
                                                Select Tenant
                                            </Label>
                                        </FormGroup>

                                        {/* Select Amount */}
                                        <FormGroup floating>
                                            <Input 
                                            id="selectAmount"
                                            name="selectAmount"
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            >
                                            </Input>
                                            <Label for="selectAmount">Enter Amount $</Label>
                                        </FormGroup>

                                        {/* Select Date */}
                                        <FormGroup floating>
                                            <Input 
                                            id="selectDate"
                                            name="selectDate"
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            >
                                            </Input>
                                            <Label for="selectDate">Select Date</Label>
                                        </FormGroup>

                                        {/* Select Payment State (Status) */}
                                        <FormGroup floating>
                                            <Input 
                                            id="selectPaymentState"
                                            name="selectPaymentState"
                                            type="select"
                                            value={paymentState}
                                            onChange={(e) => setPaymentState(e.target.value)}
                                            >
                                                <option>Full Payment</option>
                                                <option>Partial Payment</option>
                                                <option>Late Payment</option>
                                                <option>Deposit</option>
                                                <option>Other</option>
                                            </Input>
                                            <Label for="selectPaymentState">Select Payment Type</Label>
                                        </FormGroup>
                                    </Form>
                                </Dropdown>
                            </ModalBody>
                            <ModalFooter style={{ backgroundColor: "var(--primary)"}}>
                                {/* Log Payment Button */}
                                <Button color="success" onClick={handleSubmit}>Confirm</Button>

                                {/* Cancel Button */}
                                <Button onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        </Container>
    </>
  );
}


export default PaymentsDropdown;