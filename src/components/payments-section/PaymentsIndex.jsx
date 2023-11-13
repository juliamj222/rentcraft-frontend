import PaymentsCreate from "./PaymentsCreate";
import PaymentsFeed from "./PaymentsFeed";
import React, { useState, useEffect } from 'react';


function PaymentsIndex(props) {

    const [paymentsFeedItem, setPaymentsFeedItem] = useState([]);

    async function fetchPaymentsFeed() {

        try {
            
        } catch (error) {

            console.error(error)

        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchPaymentsFeed()
    }, [props.token]);
    
  return (
    <>
        <h1>Hello from PaymentsIndex</h1>
        <PaymentsCreate token={props.token} />
        <PaymentsFeed token={props.token} />
    </>
  );
}


export default PaymentsIndex;