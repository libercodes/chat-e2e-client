import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as chatThunks from '../../redux/chat.reducer';
import * as roomThunks from '../../redux/rooms.reducer';
import { RootState } from '../../redux/root.reducer';
import { Room } from '../../types/apiResponse.types';

const PublicRooms = ({ rooms, setCurrentChatRoom, getPublicRooms }: Props) => {
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPublicRooms();
    }

    return () => { isMounted = false; };
  }, []);

  const joinPublicRoom = async (room: Room) => {
    setCurrentChatRoom(room);
    history.push('/chat');
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last activity</th>
          <th>Participants</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {
            rooms.map((room) => (
              <tr>
                <td>{room?.name}</td>
                <td>{room?.lastActivity}</td>
                <td>{room?.participants}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => joinPublicRoom(room)}
                  >
                    Join
                  </Button>
                </td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getPublicRooms: async () => dispatch(roomThunks.getPublicRooms()),
  setCurrentChatRoom: async (room: Room) => dispatch(chatThunks.setCurrentRoom(room)),
});

const mapStateToProps = (state: RootState) => ({
  rooms: state.publicRooms.rooms,
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(PublicRooms);
