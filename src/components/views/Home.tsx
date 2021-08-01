import React, { useState } from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import HomePanel from './HomePanel';
import PublicRooms from './PublicRooms';

const Home = () => {
  const history = useHistory();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  return (
    <Row className="justify-content-center">
      <Col md={12} className="d-flex align-items-center flex-column">
        <h1 className="mt-5">Welcome to E2E Chat</h1>
        <Col md={6} className="d-flex justify-content-center flex-column mt-4">
          <Row>
            <Col md={12} className="mt-3 d-flex align-items-center flex-column ">
              <HomePanel />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-3 d-flex align-items-center flex-column ">
              <h3>Public rooms</h3>
              <PublicRooms />
            </Col>

          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default Home;
