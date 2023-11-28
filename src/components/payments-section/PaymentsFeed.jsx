import { Button } from "reactstrap";
import PaymentsCard from "./PaymentsCard"; 
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function PaymentsFeed(props) {
  if (!props.token) return <ReturnToAuth />;
  return (
    <>
      <div
        style={{
          //    background: "var(--primary)",
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "1%",
          marginBottom: "1%",
        }}
        className="rounded"
      >
        {props.paymentsFeedItem.map((payment, index) => (
          <PaymentsCard
            key={index}
            payment={payment}
            token={props.token}
            fetchPaymentsFeed={props.fetchPaymentsFeed}
            currentId={props.currentId}
          />
        ))}
      </div>
    </>
  );
}

export default PaymentsFeed;
