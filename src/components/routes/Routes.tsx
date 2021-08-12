import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from '../views/Chat';
import Home from '../views/Home';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/chat/:code">
      <Chat />
    </Route>
  </Switch>
);

export default Routes;
