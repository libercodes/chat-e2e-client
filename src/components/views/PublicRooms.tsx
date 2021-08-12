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
    let interval: any;

    if (isMounted) {
      getPublicRooms();

      interval = setInterval(() => {
        getPublicRooms();
      }, 5000);
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const joinPublicRoom = async (room: Room) => {
    setCurrentChatRoom(room);
    history.push(`/chat/${room.code}`);
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">Last activity</th>
          <th className="text-center">Participants</th>
          <th className="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        {
            rooms.map((room) => (
              <tr>
                <td className="text-center">{room?.name}</td>
                <td className="text-center">{new Date(room.lastActivity).toLocaleString()}</td>
                <td className="text-center">{room?.participants}</td>
                <td className="text-center">
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
