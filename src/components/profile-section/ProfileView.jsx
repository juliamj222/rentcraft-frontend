import { Col, Container, Row } from "reactstrap";
import ProfileCard from "./ProfileCard";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_USER_VIEW_BY_ID } from "../constants/endpoints";
import ReturnToAuth from "../navigation-section/ReturnToAuth";
// ! ReturnToAuth

function ProfileView(props) {
  const params = useParams();

  console.log(params);

  // useState
  const [profileView, setProfileView] = useState({});

  async function fetchProfile() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      let requestOptions = { method: "GET", headers: myHeaders };

      // Send Request
      const response = await fetch(
        API_USER_VIEW_BY_ID + "/" + params.id,
        requestOptions
      );

      // Get a Response
      const data = await response.json();
      console.log(data);

      // Set State
      // ! what needs to be set here?
      setProfileView(data.user);
      console.log(data.user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchProfile();
  }, [props.token]);

  if (!props.token) return <ReturnToAuth />;

  return (
    <>
      <Container
        style={{
          marginTop: "1%",
        }}
      >
        <Row>
          <Col>
            <ProfileCard user={profileView} token={props.token} currentId={props.currentId} fetchProfile={fetchProfile} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfileView;
