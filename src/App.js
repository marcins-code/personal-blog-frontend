import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalTemplate from 'templates/GlobalTemplate';
import Homepage from 'views/page/Homepage';

const App = () => (
  <BrowserRouter>
    <GlobalTemplate>
      <Switch>
        <Route path="/" exact component={Homepage} />
      </Switch>
    </GlobalTemplate>
  </BrowserRouter>
);

export default App;
