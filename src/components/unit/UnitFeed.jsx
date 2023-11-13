import UnitCardF from "./UnitCard";

function UnitFeed(props) {
  return (
    <>
      <div
        style={{ background: "var(--secondary)" }}
        className="rounded p-2 m-2"
      >
        {/*mapping*/}
        {props.unitFeedItems.map((unit, index) => (
          <UnitCardF
            key={index}
            unit={unit}
            address={unit}
            currentId={props.currentId}
            city={props.city}
            fetchUnitFeed={props.fetchUnitFeed}
            token={props.token}
            user={props.user}
            userId={props.userId}
          />
        ))}

        {/* Buttons */}
        {/*         <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="button rounded" onClick={props.handleSwitchUnits}>
            Create a unit
          </button>
        </div> */}
        {/* Buttons End */}
      </div>
    </>
  );
}

export default UnitFeed;
