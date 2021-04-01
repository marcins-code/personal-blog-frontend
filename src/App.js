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
import AdminCategories from 'views/admin/AdminCategories';
import AdminSeries from 'views/admin/AdminSeries';
import { useAuth } from 'hooks/useAuth';

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
            <Route path="/contact" component={Contact} />
            <Route path="/admin" exact component={AdminArticles} />
            <Route path="/admin/categories" component={AdminCategories} />
            <Route path="/admin/series" exact component={AdminSeries} />
            <Route path="/authorization" component={Authorization} />
          </GlobalTemplate>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
