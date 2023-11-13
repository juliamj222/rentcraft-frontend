import { useParams } from "react-router-dom";
import { API_UNIT_VIEW_BY_ID } from "../constants/endpoints";
//imrse
import React, { useState, useEffect } from "react";
import UnitDisplay from "../unit/UnitDisplay";

//rsfc
function UnitFeedById(props) {
  const params = useParams();
  const [unitPost, setUnitPost] = useState({});
  async function fetchUnitFeed() {
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
        API_UNIT_VIEW_BY_ID + "/" + params.id,
        requestOptions
      );
      //  Get A Response
      const data = await response.json();
      // Set State
      setUnitPost(data.unit);
    } catch (error) {
      console.error(error);
    }
  }

  //uef
  // putting [props.token] will make it so that it only runs when the token changes
  useEffect(() => {
    if (!props.token) return;
    fetchUnitFeed();
  }, [props.token]);

  return (
    <>
      <UnitDisplay
        token={props.token}
        currentId={props.currentId}
        unit={unitPost}
      />
    </>
  );
}

export default UnitFeedById;
