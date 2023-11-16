import PaymentsCard from "./PaymentsCard";

function PaymentsFeed(props) {
    
  return (
    <>
      {props.paymentsFeedItem.map((payment, index) => (
        <PaymentsCard
        key={index}
        payment={payment}
        token={props.token}
        fetchPaymentsFeed={props.fetchPaymentsFeed}
        currentId={props.currentId}
        />
      ))}
    </>
  );
}


export default PaymentsFeed;