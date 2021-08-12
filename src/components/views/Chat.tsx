import React, { useEffect, useRef, useState } from 'react';
import {
  FormControlProps,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import { ConnectedProps, connect } from 'react-redux';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import * as chatThunks from '../../redux/chat.reducer';
import { RootState } from '../../redux/root.reducer';
import { Message } from '../../types/apiResponse.types';
import { DisconnectEvent, EnumBESocketEvents, EnumSocketClientEvents } from '../../types/types';
import NavbarComponent from '../layouts/Navbar';

import { createSocketConnection, socket } from '../../config/socket';
import MessageComponent from './MessageComponent';
import UserModal from './Chat/UserModal';

const { BE_ADD_MESSAGE } = EnumBESocketEvents;

const {
  ADD_MESSAGE,
  DISCONNECT,
} = EnumSocketClientEvents;

const Chat = ({ messages, ...props }: Props) => {
  const [showModal, setShowModal] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [inputText, setInputText] = useState('');
  const lastMessageElement = useRef<HTMLDivElement>(null);
  const containerMessagesElement = useRef<HTMLDivElement>(null);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);
  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!props.room?.code) {
        props.getChatRoom(code);
      }
      createSocketConnection();

      socket.emit('join', props.room?.code);
      socket.on(ADD_MESSAGE, (data: Message) => {
        props.addMessage(data);
      });
      socket.on(DISCONNECT, (data: DisconnectEvent) => {
        props.disconnectFromEvent(data);
      });
    }

    return () => {
      isMounted = false;
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (lastMessageElement.current) {
        if (isScrollAtBottom) {
          lastMessageElement?.current!.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          });
        }
      }
    };
    scrollToBottom();
  }, [messages, isScrollAtBottom]);

  const handleScroll = () => {
    const {
      scrollHeight,
      scrollTop,
      clientHeight,
    } = containerMessagesElement.current!;

    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    if (isAtBottom) {
      setIsScrollAtBottom(true);
    } else {
      setIsScrollAtBottom(false);
    }
  };

  const shouldModalClose = () => {
    if (props.myuser) setShowModal(false);
  };
  const handleSetUser = () => {
    if (!userInput) return;
    props.setUser(userInput);
    setShowModal(false);
  };

  const handleSend = (event: any) => {
    if (event.key !== 'Enter') return;
    if (!InputEvent) return;

    const message: Message = {
      id: v4(),
      text: inputText,
      user: props.myuser,
      date: new Date().toString(),
    };

    socket.emit(BE_ADD_MESSAGE, message);
    setInputText('');
  };

  const setInputFormatted = (text: string) => {
    const formatted = text.trimStart();
    setInputText(formatted);
  };

  return (
    <Row className="d-flex justify-content-center">
      <UserModal
        showModal={showModal}
        shouldModalClose={shouldModalClose}
        setUserInput={setUserInput}
        handleSetUser={handleSetUser}
      />
      <Col md={12} sm={12} className="d-flex align-items-center justify-content-center flex-column">
        <Row>
          <ChatColumn md={12} sm={12}>
            <NavbarComponent />
            <Row>
              <ScrollableCol
                md={12}
                ref={containerMessagesElement}
                onScroll={() => handleScroll()}
              >
                {
                  messages.map((message) => (
                    <MessageComponent
                      message={message}
                      systemName={props.systemName}
                      lastMessageElement={lastMessageElement}
                      currentUser={userInput}
                    />
                  ))
                }
              </ScrollableCol>

            </Row>
            <TextBox
              placeholder="Write something..."
              onChange={(e: any) => setInputFormatted(e.target.value)}
              value={inputText}
              onKeyDown={handleSend}
            />
          </ChatColumn>
        </Row>
      </Col>
    </Row>
  );
};

const ScrollableCol = styled(Col)`
    height: 60vh;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    overflow-y: scroll;
    @media (max-width: 768px) {
        height:  calc(100vh - 3rem);
        max-height:calc(100vh - 3rem);
    }
    ::-webkit-scrollbar {
        width: 7px;
    }

    ::-webkit-scrollbar-track {
        background: black; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`;

const ChatColumn = styled(Col)`
    width: 60vw;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: black;
    overflow: hidden;
    @media (max-width: 768px) {
        height: 100vh;
        width: 100%;
    }
    
`;

const CustomSpan = styled.span`
    color: ${(props) => props.color || 'inherit'};
`;

const TextBox = styled(Form.Control)<FormControlProps>`
    height: 3rem;
    background-color: #3b3b3b;
    border: none;
    color: inherit;
    border-radius: 0;
    :focus {
        outline: none;
        background-color: #4d4c4c;
        color: rgb(0, 189, 0);
    }

`;

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (name: string) => dispatch(chatThunks.setUser(name)),
  addMessage: (message: Message) => dispatch(chatThunks.addMessage(message)),
  disconnectFromEvent: (value: DisconnectEvent) => dispatch(chatThunks.disconnectFromRoom(value)),
  disconnect: (id: string) => dispatch(chatThunks.disconnectChat(id)),
  getChatRoom: async (id: string) => dispatch(chatThunks.getChatRoom(id)),
});

const mapStateToProps = (state: RootState) => ({
  myuser: state.chat.myuser,
  messages: state.chat.messages,
  systemName: state.chat.systemName,
  room: state.chat.room,
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(Chat);
