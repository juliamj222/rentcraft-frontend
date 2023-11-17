import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_TENANT_HISTORY } from '../constants/endpoints';
import { useParams } from 'react-router-dom';
import ReturnToAuth from '../navigation-section/ReturnToAuth';
import PaymentsCard from './PaymentsCard';


function PaymentsTenantHistory(props) {

    const params = useParams()
    console.log(params)

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
            
        } catch (error) {

            console.error(error)
            
        }

    }

    useEffect(() => {
        if (!props.token) return;
        fetchTenantPaymentHistory()
    }, [props.token]);

    if (!props.token) return <ReturnToAuth />

  return (
    <>
        <h1>Tenant Payment History</h1>
        {tenantHistory.map((payment, index) => (
            <PaymentsCard
            key={index}
            payment={payment}
            token={props.token}
            currentId={props.currentId}
            />
        ))}
    </>
  );
}


export default PaymentsTenantHistory;