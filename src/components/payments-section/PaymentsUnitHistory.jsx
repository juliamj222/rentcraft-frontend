import React, { useState, useEffect } from 'react';
import PaymentsCard from './PaymentsCard';
import { API_PAYMENTS_UNIT_HISTORY } from '../constants/endpoints';
import { useParams } from 'react-router-dom';
import ReturnToAuth from '../navigation-section/ReturnToAuth';


function PaymentsUnitHistory(props) {

    const params = useParams()
    console.log(params)

    const [unitHistory, setUnitHistory] = useState([]);

    async function fetchUnitPaymentHistory() {
        
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
            const response = await fetch(API_PAYMENTS_UNIT_HISTORY + "/" + params.id, requestOptions)

            // Get a Response
            const data = await response.json()
            console.log(data)

            // Set State
            setUnitHistory(data.unit_history)
            
        } catch (error) {

            console.error(error)
            
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUnitPaymentHistory()
    }, [props.token]);

    if (!props.token) return <ReturnToAuth />

  return (
    <>
        <h1>Hello from PaymentsUnitHistory</h1>
        {unitHistory.map((payment, index) => (
            <PaymentsCard
            key={index}
            payment={payment}
            token={props.token}
            currentId={props.currentId}
            />
        ))}
        {/* <PaymentsCard payment={unitHistory} /> */}
    </>
  );
}


export default PaymentsUnitHistory;