import React, { useState } from 'react';
import {
  Button, Spinner, Container, Navbar,
} from 'react-bootstrap';

import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/root.reducer';
import * as chatThunks from '../../redux/chat.reducer';
import { DisconnectEvent, EnumBESocketEvents } from '../../types/types';

import {
  DisconnectEvent as DisconnectEventProto,
} from '../../config/proto/bundle';
import { socket } from '../../services/chat.service';

const {
  BE_DISCONNECT,
} = EnumBESocketEvents;

const NavbarComponent = ({ code, disconnect, myuser }: Props) => {
  const history = useHistory();
  const [btnTitle, setBtnTitle] = useState('Disconnect');
  const [isLoading, setIsLoading] = useState(false);

  const handleDisconnect = async () => {
    setIsLoading(true);
    setBtnTitle('Loading...');
    try {
      await disconnect(code!);
      const obj: DisconnectEvent = {
        date: new Date().toString(),
        user: myuser,
      };

      const encoded = DisconnectEventProto.encode(obj).finish();
      socket.emit(BE_DISCONNECT, encoded);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    history.push('/');
    setIsLoading(false);
  };
  return (
    <NavbarCustom bg="dark">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand>
          {`Chat ${code! || ''}`}
        </Navbar.Brand>
        <Button
          type="button"
          variant="danger"
          disabled={btnTitle === 'Not connected' || isLoading}
          onClick={() => handleDisconnect()}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {btnTitle}
        </Button>
      </Container>
    </NavbarCustom>
  );
};

const NavbarCustom = styled(Navbar)`

`;
const mapStateToProps = (state: RootState) => ({
  code: state.chat.room?.code,
  myuser: state.chat.myuser,
});

const mapDispatchToProps = (dispatch: any) => ({
  disconnect: async (id: string) => dispatch(chatThunks.disconnectChat(id)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(NavbarComponent);
