import React, { RefObject } from 'react';
import {
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Message } from '../../types/apiResponse.types';

interface Props {
  message: Message
  systemName: string
  lastMessageElement: RefObject<HTMLDivElement>
  currentUser: string
}

const MessageComponent = ({
  message, systemName, lastMessageElement, currentUser,
}: Props) => (
  <OverlayTrigger
    key={`message${message.id}`}
    placement="left"
                      // eslint-disable-next-line @typescript-eslint/no-shadow
    overlay={(props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Tooltip {...props} id={message.id}>
        {`${new Date(message.date).toLocaleTimeString()}`}
      </Tooltip>
    )}
  >
    <Row
      ref={lastMessageElement}
      className={currentUser === message.user ? 'd-flex justify-content-end my-2' : 'd-flex justify-content-start my-2'}
    >
      <MessageContainer
        myuser={currentUser === message.user}
      >
        {
          systemName === message.user
            ? (
              <p>
                <CustomSpan color="gray">{`${message.text}`}</CustomSpan>
              </p>
            )
            : (
              <p>
                {
                  message.user !== currentUser
                  && <CustomSpan color="#fefb62">{`(${message.user})   `}</CustomSpan>
                }
                <CustomSpan>{`${message.text}`}</CustomSpan>
              </p>
            )
        }
      </MessageContainer>
    </Row>
  </OverlayTrigger>
);

const CustomSpan = styled.span`
    color: ${(props) => props.color || 'inherit'};
`;

const MessageContainer = styled.div<{ myuser: boolean }>`
  background-color: ${(props) => (props.myuser ? 'royalblue' : 'green')};
  border-radius: 10px;
  display: flex;
  max-width: 50%;
  padding: 0.5rem;
  line-break: break-word;
  hyphens: auto;
`;

export default MessageComponent;
