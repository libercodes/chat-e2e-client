import React from 'react';
import { Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import Routes from './components/routes/Routes';
import { RootState } from './redux/root.reducer';

const App = (props: Props) => (
  <Container className="fullheight" fluid>
    <Routes />
  </Container>
);

const mapStateToProps = (state: RootState) => ({
  myuser: state.chat.myuser,
});

const connectToStore = connect(mapStateToProps);
interface Props extends ConnectedProps<typeof connectToStore> {}

export default connectToStore(App);
