import React, { useState, useEffect } from 'react';
import PaymentsCard from './PaymentsCard';
import { API_PAYMENTS_UNIT_HISTORY, API_UNIT_VIEW_BY_ID } from '../constants/endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import ReturnToAuth from '../navigation-section/ReturnToAuth';
import { Button } from 'reactstrap';


function PaymentsUnitHistory(props) {

    const params = useParams()
    // console.log(params)
    const navigate = useNavigate()

    function returnToAllPayments() {
        navigate("/payments/user/" + props.currentId)
    }

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
            // console.log(data)

            // Set State
            setUnitHistory(data.unit_history)
            fetchAddress(params.id)
            
        } catch (error) {

            console.error(error)
            
        }
    }

    // Fetch Address
    const [thisAddress, setThisAddress] = useState([]);
    async function fetchAddress(unit_id) {
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
            const response = await fetch(API_UNIT_VIEW_BY_ID + "/" + unit_id, requestOptions)

            // Get a Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setThisAddress(data.unit.address)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUnitPaymentHistory()
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
        <h1>Payment History for {thisAddress}</h1>
        {unitHistory.map((payment, index) => (
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


export default PaymentsUnitHistory;