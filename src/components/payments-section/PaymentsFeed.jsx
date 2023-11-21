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
        <Button
          href="/payments/create"
          style={{
            background: "var(--secondary)",
            padding: "1%",
            color: "black",
            marginTop: "1%",
            marginBottom: "1%",
            marginLeft: "30%",
            marginRight: "30%",

            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          Register a new payment
        </Button>
      </div>
    </>
  );
}

export default PaymentsFeed;
