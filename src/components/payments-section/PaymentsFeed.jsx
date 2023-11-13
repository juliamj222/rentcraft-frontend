import PaymentsCard from "./PaymentsCard";

function PaymentsFeed(props) {
    
  return (
    <>
        <h1>Hello from PaymentsFeed</h1>
        <PaymentsCard token={props.token}/>
    </>
  );
}


export default PaymentsFeed;