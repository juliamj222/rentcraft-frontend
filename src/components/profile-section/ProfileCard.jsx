import {
  Button,
  Card,
  CardBody,
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

function ProfileCard(props) {
  // Variables go here
  const { firstName, lastName, email, password, _id } = props.user;
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
      email: editEmail,
      firstName: editFirstName,
      lastName: editLastName,
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
        className="mb-3"
        style={{
          background: "var(--primary)",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "2%",
          marginLeft: "20%",
          marginRight: "20%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <CardBody>
          <CardTitle>
            <h2
              className="text-center font-primary bold"
              style={{ paddingBottom: "5%", paddingTop: "5%" }}
            >
              {firstName}'s Profile
            </h2>
          </CardTitle>

          {editModeEnabled ? (
            <>
              <Label for="firstName">New First Name:</Label>
              <Input
                id="firstName"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
                // ! className styling
              />
            </>
          ) : (
            <CardText>First Name: {firstName}</CardText>
          )}

          {editModeEnabled ? (
            <>
              <Label for="lastName">New Last Name:</Label>
              <Input
                id="lastName"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
                // ! className styling
              />
            </>
          ) : (
            <CardText>Last Name: {lastName}</CardText>
          )}

          {editModeEnabled ? (
            <>
              <Label for="email">New Email:</Label>
              <Input
                id="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                // ! className styling
              />
            </>
          ) : (
            <CardText>Email: {email}</CardText>
          )}

          {editModeEnabled ? (
            <>
              <Label for="oldPassword">Current Password</Label>
              <Input
                for="oldPassword"
                name="oldPassword"
                placeholder="Enter current password"
                type="password"
                value={password}
              />
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
              {/*    Click edit mode to change password, email, first name, last name,
              or delete user */}
            </CardText>
          )}

          {/* Edit Button */}
          {props.user_id === props.user?.user_id?._id && (
            <Button
              style={{
                background: "var(--quarternary)",

                width: "100%",
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
              style={{ background: "var(--quarternary)" }}
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
              {props.user.firstName + " " + props.user.lastName}? This is
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
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileCard;
