import React, { useRef, useState } from 'react';
import {
  Button, Spinner, Container, Navbar, Overlay, Tooltip,
} from 'react-bootstrap';

import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/root.reducer';
import * as chatThunks from '../../redux/chat.reducer';
import { DisconnectEvent, EnumBESocketEvents } from '../../types/types';

import { socket } from '../../config/socket';
import { url } from '../../config/url';

const {
  BE_DISCONNECT,
} = EnumBESocketEvents;

const NavbarComponent = ({ code, leaveRoom, myuser }: Props) => {
  const history = useHistory();
  const [btnTitle, setBtnTitle] = useState('Leave');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  const handleDisconnect = async () => {
    setIsLoading(true);
    setBtnTitle('Loading...');
    const obj: DisconnectEvent = {
      date: new Date().toString(),
      user: myuser,
    };

    socket.emit(BE_DISCONNECT, obj);
    leaveRoom();
    history.push('/');
    setIsLoading(false);
  };

  const copyInviteToClipBoard = () => {
    setShowTooltip(true);
    navigator.clipboard.writeText(`${url}/chat/${code}`);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1500);
  };

  return (
    <NavbarCustom bg="dark">
      <Container className="d-flex justify-content-between">
        <Button
          type="button"
          variant="primary"
          onClick={() => copyInviteToClipBoard()}
          ref={buttonRef}
        >
          Copy link
        </Button>
        <Overlay
          target={buttonRef.current}
          show={showTooltip}
          placement="left"
        >
          {(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Tooltip id="btn-copy-invite" {...props}>
              Invite link copied to clipboard!
            </Tooltip>
          )}
        </Overlay>
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
  position: static;
`;
const mapStateToProps = (state: RootState) => ({
  code: state.chat.room?.code,
  myuser: state.chat.myuser,
});

const mapDispatchToProps = (dispatch: any) => ({
  leaveRoom: () => dispatch(chatThunks.leaveRoom()),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(NavbarComponent);
