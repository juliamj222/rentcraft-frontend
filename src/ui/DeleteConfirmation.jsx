import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

function DeleteConfirmation(props) {
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalBody style={{ fontSize: "26px", textAlign: "center" }}>
          Are you sure that you want to DELETE {props.address}? This is
          PERMANENT.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.handleDelete(props.id);
              props.toggle();
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
