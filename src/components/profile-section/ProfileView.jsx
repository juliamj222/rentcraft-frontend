import { Col, Container, Row } from "reactstrap";
import ProfileCard from "./ProfileCard";
import React, { useState, useEffect } from 'react';


// ! ReturnToAuth

function ProfileView(props) {

    // useState
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

    async function fetchProfileCard() {
        
        try {

            // Headers

            // Request Options

            // Send Request

            // Get a Response

            // Set State
            
        } catch (error) {

            console.error(error)

        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchProfileCard()
    }, [props.token]);

    // if (!props.token) return <ReturnToAuth />

  return (
    <>
        <h1>Hello from ProfileView</h1>
        <Container className="mt-5">
            <Row>
                <Col>
                    <ProfileCard />
                </Col>
            </Row>
        </Container>
    </>
  );
}


export default ProfileView;