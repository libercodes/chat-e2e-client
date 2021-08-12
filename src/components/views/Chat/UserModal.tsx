import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const UserModal = ({
  showModal,
  shouldModalClose,
  setUserInput,
  handleSetUser,
}: Props) => (
  <Modal show={showModal} onHide={shouldModalClose}>
    <Modal.Header>
      <Modal.Title>Insert username</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Control
        placeholder="User123"
        onChange={(e) => setUserInput(e.target.value)}
      />
    </Modal.Body>

    <Modal.Footer>
      <Button
        variant="primary"
        onClick={() => handleSetUser()}
      >
        Save changes

      </Button>
    </Modal.Footer>
  </Modal>
);

interface Props {
  showModal: boolean
  shouldModalClose: () => any
  setUserInput: (value: string) => any
  handleSetUser: () => any
}

export default UserModal;
