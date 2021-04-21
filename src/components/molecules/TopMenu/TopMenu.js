import React, { useContext } from 'react';
import { PageContext, AuthContext } from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/menus';
import { CSSTransition } from 'react-transition-group';
import { darken } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;

  li {
    margin: 0 10px;
  }

  a {
    line-height: 2.2rem;
    text-transform: uppercase;
    font-family: 'Baloo 2', sans-serif;
    font-size: 2.1rem;
    font-weight: bold;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    display: flex;
    align-items: center;
    font-weight: 600;

    &:after,
    &:before {
      opacity: 0;
      align-items: center;
      color: #ff6315;
      margin-top: -3px;
      font-size: 2.8rem;
      transition: transform 0.3s, opacity 0.2s;
      font-family: 'Baloo 2', sans-serif;
    }

    &:after {
      margin-left: 2px;
      content: '}';
      transform: translateX(-20px);
    }

    &:before {
      margin-right: 2px;
      content: '{...';
      -webkit-transform: translateX(20px);
      -moz-transform: translateX(20px);
      transform: translateX(20px);
    }
    &:hover:not(.active) {
      &:before,
      &:after {
        opacity: 1;
        transform: translateX(0px);
      }
    }

    &.active {
      &:before,
      &:after {
        opacity: 1;
        transform: translateX(0px);
        color: #00bfeb;
      }
    }
  }
`;

const StyledTopMenuNavWrapper = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: 26px;
  text-shadow: ${({ theme }) => theme.menuTextShadow};
  border-radius: 0 0 3px 3px;

  background: url(${({ theme }) => theme.menuBackgrounImage}),
    linear-gradient(
      ${({ theme }) => darken(0.07, theme.appBackgroundColor)} 40%,
      ${({ theme }) => darken(0.07, theme.appBackgroundColor)} 80%,
      ${({ theme }) => darken(0.2, theme.appBackgroundColor)} 100%
    );

  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.3);
`;

const StyledNavigationWrapper = styled.div`
  position: relative;
  z-index: 301;
`;

const StyledToggleMenuIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color};
  filter: drop-shadow(
    ${({ theme }) => (theme.themeName !== 'light' ? '1px 2px 2px rgb(24, 24, 24)' : '1px 2px 2px  rgb(44, 44, 44)')}
  );
  margin-right: 50px;
  cursor: pointer;
`;

const TopMenu = () => {
  const { isAdminPage, navPosition, lang } = useContext(PageContext);
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <CSSTransition
      in={navPosition === 'menu-top'}
      timeout={900}
      classNames="menu-top"
      unmountOnExit
    >
      <StyledNavigationWrapper>
        <StyledTopMenuNavWrapper id="top-navigation">
          {!isAdminPage ? (
            <StyledList className="page-menu">
              {mainMenuItems.map((menuItem) => (
                <li key={menuItem.name_en}>
                  <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                    {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
                  </Link>
                </li>
              ))}
            </StyledList>
          ) : (
            <StyledList className="admin-menu">
              {adminMenuItems.map((menuItem) => (
                <li key={menuItem.name_en}>
                  <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                    {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
                  </Link>
                </li>
              ))}
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            </StyledList>
          )}
          {isLoggedIn && !isAdminPage && (
            <Link as={NavLink} to="/admin/article" exact>
              <StyledToggleMenuIcon icon={['fas', 'cogs']} size="2x" />
            </Link>
          )}

          {isLoggedIn && isAdminPage && (
            <Link as={NavLink} to="/" exact>
              <StyledToggleMenuIcon icon={['far', 'file-alt']} size="2x" />
            </Link>
          )}

          {!isLoggedIn && (
            <Link as={NavLink} to="/authorization" exact>
              <StyledToggleMenuIcon icon={['fas', 'sign-in-alt']} size="2x" />
            </Link>
          )}
        </StyledTopMenuNavWrapper>
      </StyledNavigationWrapper>
    </CSSTransition>
  );
};

export default React.memo(TopMenu);
