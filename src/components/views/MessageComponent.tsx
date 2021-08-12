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
    placement={currentUser === message.user ? 'right' : 'left'}
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
      className={
        // eslint-disable-next-line no-nested-ternary
        currentUser === message.user ? 'd-flex justify-content-end my-2'
          : systemName === message.user ? 'd-flex justify-content-center my-2' : 'd-flex justify-content-start my-2'
      }
    >
      <MessageContainer
        myuser={currentUser === message.user}
      >
        {
          systemName === message.user
            ? (
              <CustomSpan color="gray">{`${message.text}`}</CustomSpan>
            )
            : (
              <>
                {
                  message.user !== currentUser
                  && <CustomSpan color="#e91363">{`${message.user}`}</CustomSpan>
                }
                <CustomSpan>{`${message.text}`}</CustomSpan>
              </>
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
  background-color: ${(props) => (props.myuser ? 'royalblue' : '#242323')};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  max-width: 60%;
  padding: 0.5rem;
  line-break: break-word;
  hyphens: auto;
  color:white;
`;

export default MessageComponent;
