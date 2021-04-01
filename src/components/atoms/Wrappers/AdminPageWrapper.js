import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PageContext, AuthContext } from 'context';
import { Redirect } from 'react-router-dom';

const AdminPageWrapper = ({ children }) => {
  const pageContext = useContext(PageContext);
  const authContext = useContext(AuthContext);

  console.log('ddd');
  return pageContext.isAdminPage && !authContext.isLoggedIn ? <Redirect to="/" /> : <>{children}</>;
};

AdminPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPageWrapper;
