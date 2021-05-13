import React, { useState } from 'react';
import {
  Button,
  Col, Container, Form, Row, Alert,
} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as chatThunks from '../../redux/chat.reducer';
import { RootState } from '../../redux/root.reducer';

const Home = (props: Props) => {
  const history = useHistory();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoinChat = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!code) return;

    try {
      await props.joinChatRoom(code);
      history.push('/chat');
    } catch (e) {
      setError(`Chat room with code ${code} does not exist`);
    }
  };

  const handleCreateChatRoom = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await props.createChatRoom();
      history.push('/chat');
    } catch (e) {
      setError('An error ocurred, please try again later.');
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={12} className="d-flex align-items-center flex-column">
        <h1 className="mt-5">E2E Chat</h1>
        <Col md={4} className="d-flex justify-content-center flex-column mt-4">
          {
              error
              && <Alert variant="danger">{error}</Alert>
            }
          <Form.Control
            placeholder="Chat code"
            className="mt-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Row>
            <Col md={12} className="mt-3 d-flex justify-content-center">
              <Button
                type="submit"
                variant="primary"
                onClick={(e) => handleJoinChat(e)}
              >
                Join chat
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-3 d-flex align-items-center flex-column ">
              <p>Or create a new chat room...</p>
              <Button
                type="submit"
                variant="primary"
                onClick={(e) => handleCreateChatRoom(e)}
              >
                Create chat room
              </Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  joinChatRoom: async (id: string) => dispatch(chatThunks.joinChat(id)),
  createChatRoom: async () => dispatch(chatThunks.createChat()),
});

const connectToStore = connect(null, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(Home);
