import { Button, Card, CardBody, CardHeader, CardText, Input, Label } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { API_PAYMENTS_UPDATE, API_PAYMENTS_VIEW_BY_ID, API_PAYMENTS_VIEW_USER_ID, API_TENANTS_VIEW_ALL, API_TENANTS_VIEW_BY_ID, API_UNIT_VIEW_BY_ID, API_UNIT_VIEW_BY_USER } from "../constants/endpoints";


function PaymentsEdit(props) {

    const [paymentsCardItem, setPaymentsCardItem] = useState({});
    const [paymentsUnitId, setPaymentsUnitId] = useState({});

    const params = useParams()
    // console.log(params)

    async function fetchPaymentsCard() {
        
        try {
            
            // Headers
            const myHeaders = new Headers();
            myHeaders.append("Authorization", props.token);

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders,
            };

            // Send Request
            const response = await fetch(API_PAYMENTS_VIEW_BY_ID + "/" + params.id, requestOptions)

            // Get a Response
            const data = await response.json();
            console.log(data);
            // console.log(data.payment.unit_id);

            // Set State
            setPaymentsCardItem(data.payment)
            setPaymentsUnitId(data.payment.unit_id)
            console.log(paymentsUnitId)

        } catch (error) {

            console.error(error);
            
        }
    }

    const { unit_id, tenant_id, amount, _id, date, paymentState } = paymentsCardItem;
    const navigate = useNavigate()

    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [editPaymentState, setEditPaymentState] = useState(paymentState);
    const [editDate, setEditDate] = useState(date);
    const [editAmount, setEditAmount] = useState(amount);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled);
    }

    function navigateToUnitHistory() {
        navigate("/payments/unit/" + unit_id)
    }
    
    function navigateToTenantHistory() {
        navigate("/payments/tenant/" + tenant_id)
    }

    // Populate Dropdowns
    const [unitData, setUnitData] = useState([]);
    const [tenantData, setTenantData] = useState([]);
    const [unitId, setUnitId] = useState(unit_id);
    const [tenantId, setTenantId] = useState(tenant_id);

    async function fetchUnits() {
      try {
        // Headers
        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
  
        // Request Options
        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
  
        // Send Request
        const response = await fetch(
          API_UNIT_VIEW_BY_USER + "/" + props.currentId,
          requestOptions
        );
  
        // Get a Response
        const data = await response.json();
        console.log(data);
  
        // Set State
        setUnitData(data.user_units);
        if (data.user_units.length > 0) {
          setUnitId(data.user_units[0]._id);
        }
        // console.log(unitId)
      } catch (error) {
        console.error(error);
      }
    }
  
    async function fetchTenants() {
      try {
        // Headers
        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
  
        // Request Options
        let requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
  
        // Send Request
        const response = await fetch(
          API_TENANTS_VIEW_ALL + "/" + props.currentId,
          requestOptions
        );
  
        // Get a Response
        const data = await response.json();
        console.log(data);
  
        // Set State
        setTenantData(data.user_tenants);
        if (data.user_tenants.length > 0) {
          setTenantId(data.user_tenants[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch Address
  const [thisAddress, setThisAddress] = useState([]);
  async function fetchAddress() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      // Send Request
      const response = await fetch(API_UNIT_VIEW_BY_ID + "/" + params.unit_id, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Set State
      setThisAddress(data.unit)

    } catch (error) {
      console.error(error);
    }
  }

  // Fetch Tennant
  const [thisTennant, setThisTennant] = useState({});
  async function fetchTenant() {
    try {
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)

      // Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      // Send Request
      const response = await fetch(API_TENANTS_VIEW_BY_ID + "/" + params.tenant_id, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Set State
      setThisTennant(data.tenants)

    } catch (error) {
      console.error(error);
    }
  }
  
    useEffect(() => {
      if (!props.token) return;
      fetchPaymentsCard();
      fetchUnits();
      fetchTenants();
      fetchAddress();
      fetchTenant();
    }, [props.token]);

    async function handleEdit() {
        try {
          // Headers
          let myHeaders = new Headers();
          myHeaders.append("Authorization", props.token);
          myHeaders.append("Content-type", "application/json");
    
          // Body
          const body = {
            amount: editAmount,
            date: editDate,
            paymentState: editPaymentState,
          };
      
          // Request Options
          const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(body),
          };
      
          // Send Request
          const response = await fetch(
            API_PAYMENTS_UPDATE + "/" + _id,
            requestOptions
          );
      
          // Get a Response
          const data = await response.json();
          console.log(data);
    
          // Refresh the feed
          fetchPaymentsCard()
      
          // Change the edit mode to false
          setEditModeEnabled(false);
    
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <>
        <h1>Hello from PaymentsEdit</h1>
        <Card>
            <CardHeader>PAYMENT ID: {_id}</CardHeader>
            <CardBody>

                {/* Unit ID */}
                {editModeEnabled ? (
                    <>
                    <Label for='selectUnit'>Select Unit</Label>
                    <Input
                    id='selectUnit'
                    name='selectUnit'
                    type='select'
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    >
                        {unitData.map((unit, index) => (
                        <option key={index} value={unit._id}>
                            {unit.address}
                        </option>
                        ))}
                     </Input>
                    </>
                ) : <CardText>ADDRESS: </CardText> }

                {/* Tenant ID */}
                {editModeEnabled ? (
                    <>
                    <Label for='selectTenant'>Select Tenant</Label>
                    <Input
                    id='selectTenant'
                    name='selectTenant'
                    type='select'
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    >
                        {tenantData.map((tenant, index) => (
                        <option key={index} value={tenant._id}>
                            {tenant.firstName} {tenant.lastName}
                        </option>
                        ))}
                    </Input>
                    </>
                ) : <CardText>TENANT:</CardText> }

                {/* Amount */}
                {editModeEnabled ? (
                    <>
                    <Label for="amount">Amount</Label>
                    <Input 
                        id="amount"
                        type='number'
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                    />
                    </>
                ) : (
                    <CardText>Amount: {amount}</CardText>
                )}

                {/* Date */}
                {editModeEnabled ? (
                    <>
                    <Label for="date">Date</Label>
                    <Input 
                        id="date"
                        type='date'
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                    />
                    </>
                ) : (
                    <CardText>Date: {date}</CardText>
                )}

                {/* Payment Status */}
                {editModeEnabled ? (
                    <>
                    <Label for="paymentState">Payment Status</Label>
                    <Input 
                        id="paymentState"
                        type='select'
                        value={editPaymentState}
                        onChange={(e) => setEditPaymentState(e.target.value)}
                    >
                        <option>Full payment</option>
                        <option>Partial payment</option>
                        <option>Late payment</option>
                        <option>Deposit</option>
                        <option>Other</option>
                    </Input>
                    </>
                ) : (
                    <CardText>Status: {paymentState}</CardText>
                )}

            {/*Toggle Edit Button */}
            {props.user_id === props.user?.user_id?._id && (
                <Button onClick={handleToggleEdit}>
                Edit Payment
                </Button>
            )}

            {/* Save Button in Edit Mode */}
            {editModeEnabled && (
                <Button color="warning" onClick={handleEdit}>
                SAVE EDITS
                </Button>
            )}

            {/* Unit Payment History */}
            {props.user_id === props.user?.user_id?._id && (
                <Button color="primary" onClick={navigateToUnitHistory}>
                Unit Payment History
                </Button>
            )}

            {/* Tenant Payment History */}
            {props.user_id === props.user?.user_id?._id && (
                <Button color="primary" onClick={navigateToTenantHistory}>
                Tenant Payment History
                </Button>
            )}

            </CardBody>
        </Card>
    </>
  );
}


export default PaymentsEdit;