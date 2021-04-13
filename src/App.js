import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from 'context';
import GlobalTemplate from 'templates/GlobalTemplate';
import Homepage from 'views/page/Homepage';
import Categories from 'views/page/Categories';
import Series from 'views/page/Series';
import Contact from 'views/page/Contact';
import Authorization from 'views/page/Authorization';
import AdminArticles from 'views/admin/AdminArticles';
import AdminCategories from 'views/admin/AdminArticleTypes';
import { useAuth } from 'hooks/useAuth';
import ManageArticleTypes from 'views/admin/ManageArticleTypes';
import AdminGlossary from 'views/admin/AdminGlossary';
import ManageGlossary from 'views/admin/ManageGlossary';
import Glossary from 'views/page/Glossary';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

const App = () => {
  const authHandler = useAuth();
  const {
    isLoggedIn,
    userId,
    userRoles,
    userFirstName,
    userLastName,
    token,
    tokenExpiration,
    login,
    logout,
  } = authHandler;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userRoles,
        userFirstName,
        userLastName,
        token,
        tokenExpiration,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <Switch>
          <GlobalTemplate>
            <Route path="/" exact component={Homepage} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/series" component={Series} />
            <Route path="/glossary" component={Glossary} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" exact component={AdminArticles} />
            <Route path="/admin/article-types" component={AdminCategories} />
            <Route path="/admin/glossary" component={AdminGlossary} />
            <Route path="/authorization" component={Authorization} />
            <Route path="/admin/manage-article-type" exact component={ManageArticleTypes} />
            <Route path="/admin/manage-article-type/:atid" exact component={ManageArticleTypes} />
            <Route path="/admin/manage-glossary" exact component={ManageGlossary} />
            <Route path="/admin/manage-glossary/:gid" exact component={ManageGlossary} />
          </GlobalTemplate>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
