import React, { useContext } from 'react';
import { AuthContext, PageContext } from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/menus';
import { CSSTransition } from 'react-transition-group';
import './animation.css';
import Card from '../Card/Card';

const StyledNavigationWrapper = styled.div`
  position: absolute;
  top: 10px;
`;

const StyledSidebarNav = styled.nav``;

const StyledListsWrapper = styled.div`
  position: fixed;
`;
const StyledList = styled.ul`
  margin: 10px 20px;
  display: block !important;
  list-style: none;
  > * {
    color: ${({ theme }) => theme.grey200};
  }
  li {
    margin: 10px 0;
    padding: 10px 30px 10px 0;
  }

  a {
    text-decoration: none;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Baloo 2', sans-serif;
    text-transform: uppercase;
    position: relative;
    line-height: 1rem;
    color: ${({ theme }) => theme.grey200};

    &:before {
      content: '';
      font-style: italic;
      font-size: 1.7rem;
      text-transform: lowercase;
      font-family: 'Patrick Hand', cursive;
      color: #00bfeb;
      position: absolute;
      bottom: 13px;
      vertical-align: text-bottom;
    }

    &.active {
      :before {
        content: 'this.';
        left: -30px;
        color: #ff6315;
      }
    }

    &:hover:not(.active) {
      :before {
        content: 'use.';
        left: -27px;
        vertical-align: text-bottom;
      }
    }
  }
`;

const SideBar = () => {
  const appContext = useContext(PageContext);
  const authContext = useContext(AuthContext);
  const { lang, sidebarTheme, navPosition } = appContext;

  return (
    <StyledNavigationWrapper>
      <CSSTransition
        in={navPosition === 'sidebar'}
        timeout={1000}
        classNames="sidebar"
        unmountOnExit
      >
        <StyledSidebarNav id="top-navigation" className={sidebarTheme}>
          <StyledListsWrapper>
            <StyledList>
              {mainMenuItems.map((menuItem) => (
                <li key={menuItem.name_en}>
                  <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                    {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
                  </Link>
                </li>
              ))}
              {!authContext.isLoggedIn && (
                <Link as={NavLink} to="/authorization">
                  Auth
                </Link>
              )}
            </StyledList>
            {authContext.isLoggedIn && (
              <>
                <br />
                <Card cardColor="red">
                  <StyledList>
                    <p>Admin </p>
                    {adminMenuItems.map((menuItem) => (
                      <li key={menuItem.name_en}>
                        <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                          {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link onClick={authContext.logout}>Logout</Link>
                    </li>
                  </StyledList>
                </Card>
              </>
            )}
          </StyledListsWrapper>
        </StyledSidebarNav>
      </CSSTransition>
    </StyledNavigationWrapper>
  );
};

export default SideBar;
