import React, { useState, useEffect } from "react";
import UnitFeed from "./../unit/UnitFeed";
import { API_UNIT_VIEW_ALL } from "../constants/endpoints";
import UnitCreate from "./../unit/UnitCreate";

const MainIndex = (props) => {
  const [unitFeedItems, setUnitFeedItems] = useState([]);
  const [user_id, setUser_id] = useState("");
  async function fetchUnitFeed() {
    try {
      //Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      //Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      //Send Request  (open a file quickly ctrl,p  file name)
      const response = await fetch(API_UNIT_VIEW_ALL, requestOptions);
      //Get a response
      const data = await response.json();
      console.log(data);
      //Set state
      setUnitFeedItems(data.units.reverse());
      setUser_id(data.user_id);
    } catch (error) {
      console.error(error);
      /*  props.updateToken(null); */
    }
  }

  //uef
  useEffect(() => {
    //check to see if we have a token
    if (props.token === "") {
      return;
    }
    // exit clause
    fetchUnitFeed();
  }, [props.token]);
  console.log(props.token);

  const [unitFeed, setUnitFeed] = useState(true);
  function handleSwitchUnits() {
    setUnitFeed(!unitFeed);
  }

  return (
    <>
      <div style={{ background: "var(--primary)" }}>
        {unitFeed ? (
          <UnitCreate
            token={props.token}
            handleSwitchUnits={handleSwitchUnits}
            fetchUnitFeed={fetchUnitFeed}
          />
        ) : (
          <UnitFeed
            token={props.token}
            currentId={props.currentId}
            unitFeedItems={unitFeedItems}
            handleSwitchUnits={handleSwitchUnits}
            fetchUnitFeed={fetchUnitFeed}
          />
        )}
      </div>
    </>
  );
};

export default MainIndex;
