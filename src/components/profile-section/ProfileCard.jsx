import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React, { useState } from 'react';
import { API_USER_DELETE_BY_ID, API_USER_PATCH_BY_ID } from "../constants/endpoints";

function ProfileCard(props) {

    // Variables go here
    const { firstName, lastName, email, password, _id } = props.user
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [editEmail, setEditEmail] = useState(email);
    const [editFirstName, setEditFirstName] = useState(firstName);
    const [editLastName, setEditLastName] = useState(lastName);
    const [editPassword, setEditPassword] = useState(password);
    const [modal, setModal] = useState(false);

    function handleToggleEdit() {
      setEditModeEnabled(!editModeEnabled)
    }

    function toggleModal() {
      setModal(!modal)
    }

    async function handleEdit() {
      
      // Headers
      let myHeaders = new Headers()
      myHeaders.append("Authorization", props.token)
      myHeaders.append("Content-Type", "application/json")

      // Body
      const body = {
        email: editEmail,
        firstName: editFirstName,
        lastName: editLastName,
        password: editPassword,
      }

      // Request Options
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body)
      }

      // Send Request
      const response = await fetch(API_USER_PATCH_BY_ID + "/" + _id, requestOptions)

      // Get a Response
      const data = await response.json()
      console.log(data)

      // Change the edit mode to false
      setEditModeEnabled(false)

    }

    async function handleDelete() {

      try {
        
        // Headers
        const myHeaders = new Headers()
        myHeaders.append("Authorization", props.token)

        // Request Options
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders
        }

        // Send Request
        const response = await fetch(API_USER_DELETE_BY_ID + "/" + _id, requestOptions)

        // Get a response
        const data = await response.json()
        console.log(data)

      } catch (error) {

        console.error(error)
        
      }
    }

  return (
    <>
        <Card className="mb-3" style={{ width: "100%" }}>

            <CardBody>

                <CardTitle>{firstName}'s Profile</CardTitle>

                {editModeEnabled ? ( <>
                  <Label for="firstName">NEW FIRST NAME:</Label>
                  <Input id="firstName" 
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  // ! className styling
                  />
                </>) : <CardText>FIRST NAME: {firstName}</CardText> }

                {editModeEnabled ? ( <>
                  <Label for="lastName">NEW LAST NAME:</Label>
                  <Input id="lastName"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  // ! className styling
                  />
                </>) : (<CardText>LAST NAME: {lastName}</CardText>)}

                {editModeEnabled ? ( <>
                  <Label for="email">NEW EMAIL:</Label>
                  <Input id="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  // ! className styling
                  />
                </>) : (<CardText>EMAIL: {email}</CardText>)}

                {editModeEnabled ? ( <>
                  <Label for="oldPassword">CURRENT PASSWORD</Label>
                  <Input for="oldPassword"
                  name="oldPassword"
                  placeholder="Enter current password"
                  type="password"
                  value={password}
                  />
                  <Label for="newPassword">NEW PASSWORD:</Label>
                  <Input id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  // ! bcrypt and styling
                  />
                </>) : (<CardText>Click edit mode to change password, email, first name, last name, or delete user</CardText>)}

                {/* Edit Button */}
                { props.user_id === props.user?.user_id?._id && <Button color="warning" onClick={handleToggleEdit}>EDIT MODE</Button>}

                {/* Save Button */}
                {editModeEnabled && (<Button color="success" onClick={handleEdit}>SAVE CHANGES</Button>)}

                {/* Delete Button */}
                {editModeEnabled && (<Button color="danger" onClick={toggleModal}>DELETE USER</Button>)}
                {/* Delete Modal */}
                <Modal isOpen={modal} toggle={toggleModal} {...props}>
                  <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
                  <ModalBody>TEXT TO WARN ABOUT DELETE</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>Confirm Deletion</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>

            </CardBody>

        </Card>
    </>
  );
}


export default ProfileCard;