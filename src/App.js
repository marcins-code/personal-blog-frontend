import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from 'views/site/Homepage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Homepage} />
    </Switch>
  </BrowserRouter>
);

export default App;
