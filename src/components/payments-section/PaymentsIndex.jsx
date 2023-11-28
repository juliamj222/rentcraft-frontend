import { API_PAYMENTS_VIEW_USER_ID } from "../constants/endpoints";
import PaymentsCreate from "./PaymentsCreate";
import PaymentsFeed from "./PaymentsFeed"; 
import Paymentparams from "./PaymentNavbar";
import React, { useState, useEffect } from "react"; 
import PaymentsDropdown from "./PaymentsDropdown";


function PaymentsIndex(props) {
  const [paymentsFeedItem, setPaymentsFeedItem] = useState([]); 
  const [collapsed, setCollapsed] = useState(true); 

  async function fetchPaymentsFeed() {
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
        API_PAYMENTS_VIEW_USER_ID + "/" + props.currentId,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      setPaymentsFeedItem(data.payment);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchPaymentsFeed();
  }, [props.token]);

  const hasPayments = paymentsFeedItem && paymentsFeedItem.length > 0;

  return (
    <>
    <PaymentsDropdown token={props.token} currentId={props.currentId} paymentsFeedItem={paymentsFeedItem} fetchPaymentsFeed={fetchPaymentsFeed} />
    <PaymentsFeed
      paymentsFeedItem={paymentsFeedItem}
      token={props.token}
      fetchPaymentsFeed={fetchPaymentsFeed}
      currentId={props.currentId}
    />
    </>
  );
}

export default PaymentsIndex;
