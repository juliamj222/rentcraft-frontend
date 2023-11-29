import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_TENANT_HISTORY, API_TENANTS_VIEW_BY_ID } from '../constants/endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import ReturnToAuth from '../navigation-section/ReturnToAuth';
import PaymentsCard from './PaymentsCard';
import { Button } from 'reactstrap';


function PaymentsTenantHistory(props) {

    const params = useParams()
    // console.log(params)
    const navigate = useNavigate()

    function returnToAllPayments() {
        navigate("/payments/user/" + props.currentId)
    }

    const [tenantHistory, setTenantHistory] = useState([]);

    async function fetchTenantPaymentHistory() {
        
        try {

            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders
            }

            // Send Request
            const response = await fetch(API_PAYMENTS_TENANT_HISTORY + "/" + params.id, requestOptions)

            // Get a Response
            const data = await response.json()
            console.log(data)

            // Set State
            setTenantHistory(data.tenant_history)
            fetchTenant(params.id)
            
        } catch (error) {

            console.error(error)
            
        }

    }

    // Fetch Tennant
    const [thisTennant, setThisTennant] = useState({});
    async function fetchTenant(tenant_id) {
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
            const response = await fetch(API_TENANTS_VIEW_BY_ID + "/" + tenant_id, requestOptions)

            // Get a Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setThisTennant(data.tenants)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchTenantPaymentHistory()
    }, [props.token]);

    if (!props.token) return <ReturnToAuth />

  return (
    <>
    <div style={{
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "1%",
        marginBottom: "1%",
    }}>
        <h1> Payment History for {thisTennant.firstName} {thisTennant.lastName}</h1>
        {tenantHistory.map((payment, index) => (
            <PaymentsCard
            key={index}
            payment={payment}
            token={props.token}
            currentId={props.currentId}
            />
        ))}
        <Button onClick={returnToAllPayments} style={{ background: "var(--tertiary)"}}>
            Return to All Payments
        </Button>
    </div>
    </>
  );
}


export default PaymentsTenantHistory;