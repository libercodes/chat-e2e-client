import React, { useState } from 'react';
import {
  Tab, Tabs, Col, Button, Form, Row,
} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import * as chatThunks from '../../redux/chat.reducer';
import { CreateRoomDto } from '../../types/types';

const defaultNewRoomValues = {
  name: '',
  isPublic: false,
};

const HomePanel = (props: Props) => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState<any>('join');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [newRoom, setNewRoom] = useState<CreateRoomDto>(defaultNewRoomValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinChat = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!code) return;
    setIsLoading(true);

    try {
      await props.getChatRoom(code);
      setIsLoading(false);
      history.push('/chat');
    } catch (e) {
      setError(`Chat room with code ${code} does not exist`);
    }
    setIsLoading(false);
  };

  const handleCreateChatRoom = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!newRoom.name) return;
    setIsLoading(true);

    try {
      await props.createChatRoom(newRoom);
      setIsLoading(false);
      history.push('/chat');
    } catch (e) {
      setError('An error ocurred, please try again later.');
    }
    setIsLoading(false);
  };

  const changeTab = (tab: any) => {
    if (isLoading) return;
    setCurrentTab(tab);
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={currentTab}
      onSelect={(k) => changeTab(k)}
      className="mb-3"
      variant="pills"
    >
      <Tab eventKey="join" title="Join Room" disabled={isLoading}>
        <Col md={12} className="mt-3 d-flex justify-content-center align-items-center flex-column">
          <Form.Control
            onChange={(e) => setCode(e.target.value)}
            placeholder="Room's code"
            value={code}
          />
          <Button
            className="mt-3"
            type="submit"
            variant="primary"
            onClick={(e) => handleJoinChat(e)}
            disabled={!code || isLoading}
          >
            Join private room
          </Button>
        </Col>
      </Tab>
      <Tab eventKey="create" title="Create room" disabled={isLoading}>
        <Col md={12} className="mt-3 d-flex justify-content-center align-items-center flex-column">
          <Form.Control
            onChange={(e) => setNewRoom((x) => ({ ...x, name: e.target.value }))}
            placeholder="Room's name"
            value={newRoom.name}
          />
          <Form.Check
            className="mt-3"
            type="checkbox"
            onChange={(e) => setNewRoom((x) => ({ ...x, isPublic: e.target.checked }))}
            checked={newRoom.isPublic}
            label="Make room public"
          />
          <Button
            className="mt-3"
            type="submit"
            variant="primary"
            onClick={(e) => handleCreateChatRoom(e)}
            disabled={!newRoom.name || isLoading}
          >
            Create room
          </Button>
        </Col>
      </Tab>
    </Tabs>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getChatRoom: async (id: string) => dispatch(chatThunks.getChatRoom(id)),
  createChatRoom: async (dto: CreateRoomDto) => dispatch(chatThunks.createChat(dto)),
});

const connectToStore = connect(null, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(HomePanel);
