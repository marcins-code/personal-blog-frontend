import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalTemplate from 'templates/GlobalTemplate';
import Homepage from 'views/page/Homepage';
import Categories from 'views/page/Categories';
import Authorization from 'views/page/Authorization';
import AdminArticles from 'views/admin/AdminArticles';
import AdminCategories from 'views/admin/AdminCategories';
import AdminSeries from 'views/admin/AdminSeries';

const App = () => (
  <BrowserRouter>
    <Switch>
      <GlobalTemplate>
        <Route path="/" exact component={Homepage} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/admin" exact component={AdminArticles} />
        <Route path="/admin/categories" component={AdminCategories} />
        <Route path="/admin/series" exact component={AdminSeries} />
        <Route path="/authorization" component={Authorization} />
      </GlobalTemplate>
    </Switch>
  </BrowserRouter>
);

export default App;
