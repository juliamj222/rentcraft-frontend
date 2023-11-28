import { useParams } from "react-router-dom";
import UnitCardF from "./UnitCard";
import { Button } from "reactstrap";
import ReturnToAuth from "../navigation-section/ReturnToAuth";
import UnitDisplayOrUnitEdit from "./UnitDisplay";

function UnitFeed(props) {
  const params = useParams();
  if (!props.token) return <ReturnToAuth />;
  console.log(props.unitFeedItems);
  // return props.unitFeedItems
  //   .filter((unit) => unit.active === true)
  //   .map((unit) => {
  //     console.log("CITY", unit.city);
  //     console.log(unit.active);

      return (
        <>
          <div
            style={{
              display: "flex",
              direction: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/*mapping*/}

            {props.unitFeedItems
            .filter((unit) => unit.active === true)
            .map((unit, index) => (
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
                marginTop: "5%",
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
    };


export default UnitFeed;
