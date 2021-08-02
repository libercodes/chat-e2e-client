import React, { useEffect, useRef, useState } from 'react';
import {
  FormControlProps,
  Button, Col, Form, Modal, Row,
} from 'react-bootstrap';

import { ConnectedProps, connect } from 'react-redux';
import styled from 'styled-components';
import * as chatThunks from '../../redux/chat.reducer';
import { RootState } from '../../redux/root.reducer';
import { Message } from '../../types/apiResponse.types';
import { DisconnectEvent, EnumBESocketEvents, EnumSocketClientEvents } from '../../types/types';
import NavbarComponent from '../layouts/Navbar';

import { createSocketConnection, socket } from '../../config/socket';

const {
  BE_ADD_MESSAGE,
} = EnumBESocketEvents;

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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
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
      text: inputText,
      user: props.myuser,
      date: new Date().toString(),
    };

    socket.emit(BE_ADD_MESSAGE, message);
    setInputText('');
  };

  return (
    <Row className="d-flex justify-content-center">
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
                      <Row
                        ref={lastMessageElement}
                        // eslint-disable-next-line react/no-array-index-key
                      >
                        <Col>
                          {
                            props.systemName === message.user
                              ? (
                                <p>
                                  {`[${new Date(message.date).toLocaleTimeString()}] `}
                                  <CustomSpan color="gray">{`${message.text}`}</CustomSpan>

                                </p>
                              )
                              : (
                                <p>
                                  {`[${new Date(message.date).toLocaleTimeString()}] `}
                                  <CustomSpan color="#fefb62">{`(${message.user})   `}</CustomSpan>
                                  <CustomSpan>{`${message.text}`}</CustomSpan>

                                </p>
                              )
                          }

                        </Col>
                      </Row>
                    ))
                }
              </ScrollableCol>

            </Row>
            <TextBox
              placeholder="Write something..."
              onChange={(e: any) => setInputText(e.target.value)}
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
    width: 50vw;
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
    position: absolute;
    bottom: 0;
    left: 0;
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
