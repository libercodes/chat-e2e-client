import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import Routes from './components/routes/Routes';
import { RootState } from './redux/root.reducer';
import { socket } from './services/chat.service';
import { DisconnectEvent, EnumSocketClientEvents } from './types/types';
import {
  Message as MessageProto,
  DisconnectEvent as DisconnectEventProto,
} from './config/proto/bundle';
import { Message } from './types/apiResponse.types';
import * as chatThunks from './redux/chat.reducer';

const {
  ADD_MESSAGE,
  DISCONNECT,
} = EnumSocketClientEvents;

const App = (props: Props) => {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      socket.on(ADD_MESSAGE, (data: Uint8Array) => {
        const message: Message = MessageProto.decode(data);
        props.addMessage(message);
      });
      socket.on(DISCONNECT, (data: Uint8Array) => {
        const obj = DisconnectEventProto.decode(data);
        props.disconnect(obj);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Container className="fullheight" fluid>
      <Routes />
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  myuser: state.chat.myuser,
});

const mapDispatchToProps = (dispatch: any) => ({
  addMessage: (message: Message) => dispatch(chatThunks.addMessage(message)),
  disconnect: (obj: DisconnectEvent) => dispatch(chatThunks.disconnectFromRoom(obj)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(App);
