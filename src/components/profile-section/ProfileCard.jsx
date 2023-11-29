import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import React, { useState } from "react";
import {
  API_USER_DELETE_BY_ID,
  API_USER_PATCH_BY_ID,
} from "../constants/endpoints";
import ReturnToAuth from "../navigation-section/ReturnToAuth";

function ProfileCard(props) {
  // Variables go here
  const { firstName, lastName, email, password, _id } = props.profileView;
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [editEmail, setEditEmail] = useState(email);
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editPassword, setEditPassword] = useState(password);
  const [modal, setModal] = useState(false);

  function handleToggleEdit() {
    setEditModeEnabled(!editModeEnabled);
  }

  function toggleModal() {
    setModal(!modal);
  }

  async function handleEdit(evt) {
    evt.preventDefault(); 
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");

    // Body
    const body = {
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
      password: editPassword,
    };

    // Request Options
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    // Send Request
    const response = await fetch(
      API_USER_PATCH_BY_ID + "/" + _id,
      requestOptions
    );

    // Get a Response
    const data = await response.json();
    console.log(data); 

    // refresh feed
    props.fetchProfile()

    // Change the edit mode to false
    setEditModeEnabled(false);
  }

  async function handleDelete() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);

      // Request Options
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };

      // Send Request
      const response = await fetch(
        API_USER_DELETE_BY_ID + "/" + _id,
        requestOptions
      );

      // Get a response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card
        style={{
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <CardHeader style={{
          display: "flex",
          justifyContent: "center",
          background: "var(--secondary)",
          fontSize: "1.5em"
        }}>
            {firstName} {lastName}'s Account
        </CardHeader>
        <CardBody>

          {editModeEnabled ? (
            <>
              <Label for="firstName">First Name:</Label>
              <Input
                id="firstName"
                type="text"
                placeholder={firstName}
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </>
          ) : (
            <CardText>First Name: {firstName}</CardText>
          )}

          {editModeEnabled ? (
            <>
              <Label for="lastName">Last Name:</Label>
              <Input
                id="lastName"
                type="text"
                placeholder={lastName}
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </>
          ) : (
            <CardText>Last Name: {lastName}</CardText>
          )}

          {editModeEnabled ? (
            <>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder={email}
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </>
          ) : (
            <CardText>Email: {email}</CardText>
          )}

          {editModeEnabled ? (
            <>
              {/* <Label for="oldPassword">Current Password</Label>
              <Input
                for="oldPassword"
                name="oldPassword"
                placeholder="Enter current password"
                type="password"
                value={password}
              /> */}
              <Label for="newPassword">New Password:</Label>
              <Input
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                style={{ marginBottom: "5%" }}
                // ! bcrypt and styling
              />
            </>
          ) : (
            <CardText>
            </CardText>
          )}
        </CardBody>

        <CardFooter style={{
          display: "flex",
          flexDirection: "row",
          background: "var(--primary)",
          justifyContent: "space-evenly"
        }}>
          {/* Edit Button */}
          {props.profileView._id === props.profileView?._id && (
            <Button
              style={{
                background: "var(--quarternary)",
                // width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleToggleEdit}
            >
              Edit Mode
            </Button>
          )}

          {/* Save Button */}
          {editModeEnabled && (
            <Button
              style={{ background: "" }}
              onClick={handleEdit}
            >
              Save Changes
            </Button>
          )}

          {/* Delete Button */}
          {editModeEnabled && (
            <Button
              style={{
                background: "#860A35",

                color: "white",
              }}
              onClick={toggleModal}
            >
              Delete User
            </Button>
          )}
          {/* Delete Modal */}
          <Modal isOpen={modal} toggle={toggleModal} {...props}>
            <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure that you want to DELETE{" "}
              {props.profileView.firstName + " " + props.profileView.lastName}? This is
              PERMANENT.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleDelete}>
                Confirm Deletion
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProfileCard;
