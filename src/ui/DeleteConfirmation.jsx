import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function DeleteConfirmation(props) {
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalBody style={{ fontSize: "26px", textAlign: "center" }}>
          Are you sure you want to DELETE {props.address}? This is PERMANENT.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.function(props.id);
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
