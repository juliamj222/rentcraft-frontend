import { API_PAYMENTS } from "../constants/endpoints";
import PaymentsCreate from "./PaymentsCreate";
import PaymentsFeed from "./PaymentsFeed";
import React, { useState, useEffect } from 'react';


function PaymentsIndex(props) {

    const [paymentsFeedItem, setPaymentsFeedItem] = useState([]);
    const [userId, setUserId] = useState("");

    async function fetchPaymentsFeed() {

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
            const response = await fetch(API_PAYMENTS, requestOptions)

            // Get a Response
            const data = await response.json()
            console.log(data)

            // Set State
            setPaymentsFeedItem(data.payment)
            setUserId(data.userId)
            
        } catch (error) {

            console.error(error)

        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchPaymentsFeed()
    }, [props.token]);

    // ! RETURN TO AUTH
    
  return (
    <>
        <h1>Hello from PaymentsIndex</h1>
        <PaymentsCreate token={props.token} fetchPaymentsFeed={fetchPaymentsFeed} />
        <PaymentsFeed token={props.token} fetchPaymentsFeed={fetchPaymentsFeed} userId={userId} />
    </>
  );
}


export default PaymentsIndex;