import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalTemplate from 'templates/GlobalTemplate';
import Homepage from 'views/page/Homepage';
import Categories from 'views/page/Categories';
import AdminArticles from 'views/admin/AdminArticles';
import AdminCategories from 'views/admin/AdminCategories';
import AdminSeries from 'views/admin/AdminSeries';
// import AdminTemplate from 'templates/AdminTemplate';

const App = () => (
  <BrowserRouter>
    <Switch>
      <GlobalTemplate>
        <Route path="/" exact component={Homepage} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/admin" exact component={AdminArticles} />
        <Route path="/admin/categories" component={AdminCategories} />
        <Route path="/admin/series" exact component={AdminSeries} />
      </GlobalTemplate>
    </Switch>
  </BrowserRouter>
);

export default App;
