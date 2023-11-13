import { Col, Container, NavLink, Row } from "reactstrap";
import React, { useState, useEffect } from "react";
import UnitFeed from "./../unit/UnitFeed";
import UnitCreate from "./../unit/UnitCreate";
import { API_UNIT_VIEW_ALL } from "../constants/endpoints";
import ReturnToAuth from "../navigation-section/ReturnToAuth";
import { useParams } from "react-router-dom";

function MainIndex(props) {
  const params = useParams();
  console.log(params);

  const [unitFeedItems, setUnitFeedItems] = useState([]);
  const [userId, setUserId] = useState("");
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
        API_UNIT_VIEW_ALL,

        requestOptions
      );
      //  Get A Response
      const data = await response.json();
      console.log(data);

      // Set State
      setUnitFeedItems(data.units.reverse());
      setUserId(data.userId);
    } catch (error) {
      console.error(error);
    }
  }

  // uef
  //  putting [props.token] will make it so that it only runs when the token changes
  useEffect(() => {
    if (!props.token) return;
    fetchUnitFeed();
  }, [props.token]);

  if (!props.token) return <ReturnToAuth />;

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md="8">
            <UnitFeed
              unitFeedItems={unitFeedItems}
              token={props.token}
              fetchUnitFeed={fetchUnitFeed}
              userId={userId}
              currentId={props.currentId}
              //   user={props.user}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainIndex;
