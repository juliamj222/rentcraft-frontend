import { useParams } from "react-router-dom";
import UnitCardF from "./UnitCard";
import { Button } from "reactstrap";

function UnitFeed(props) {
  const params = useParams();
  return (
    <>
      <div /* style={{ background: "var(--primary)" }} className="rounded p-2 m-2" */
      >
        {/*mapping*/}
        {props.unitFeedItems.map((unit, index) => (
          <UnitCardF
            key={index}
            unit={unit}
            address={props.address}
            currentId={props.currentId}
            city={props.city}
            fetchUnitFeed={props.fetchUnitFeed}
            token={props.token}
            user={props.user}
            userId={props.userId}
          />
        ))}
      </div>
      <div>
        <Button
          href="/unit/create"
          style={{
            background: "var(--secondary)",
            paddingLeft: "1%",
            paddingRight: "1%",
            paddingTop: "1%",
            paddingBottom: "1%",
            color: "black",
            marginTop: "1%",
            marginBottom: "1%",
            marginLeft: "30%",
            marginRight: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          {" "}
          Register a new unit
        </Button>
      </div>
    </>
  );
}

export default UnitFeed;
