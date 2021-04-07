import React, { useContext } from 'react';
import { AuthContext, PageContext } from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/language';

const StyledList = styled.ul`
  top: 10px;
  margin: 10px 20px;
  padding: 20px 17px;
  display: block !important;
  list-style: none;
  li {
    margin: 28px 0;
    padding: 0 20px;
  }

  a {
    text-decoration: none;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Baloo 2', sans-serif;
    text-transform: uppercase;
    position: relative;
    line-height: 1rem;

    &:before {
      content: '';
      font-style: italic;
      font-size: 1.5rem;
      text-transform: lowercase;
      font-family: 'Patrick Hand', cursive;
      color: #00bfeb;
      position: absolute;
      bottom: 10px;
      vertical-align: text-bottom;
    }

    &.active {
      :before {
        content: 'this.';
        left: -29px;
        color: #ff6315;
      }
    }

    &:hover:not(.active) {
      :before {
        content: 'use.';
        left: -25px;
        vertical-align: text-bottom;
      }
    }
  }
`;

const StyledSidebarNav = styled.nav`
  height: 100vh;
  left: 0;
  top: 0;
  margin: 0;
  overflow: hidden;
  color: #fff;
  box-shadow: -15px 0 45px -20px rgba(0, 0, 0, 0.9) inset;
  background-color: ${({ theme }) => theme.sidebarBackgroundColor};
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.28) 50%,
      rgba(0, 0, 0, 0.17) 100%
    ),
    url(${({ theme }) => theme.sidebarbackgroundImage});
  > ul > li > a {
    color: ${({ theme }) => theme.sidebarColor};
    text-shadow: 1px 2px 2px ${({ theme }) => theme.sidebarTextShadowColor};
  }
`;

const StyledNavigationWrapper = styled.div`
  position: fixed;
`;

const SideBar = () => {
  const appContext = useContext(PageContext);
  const authContext = useContext(AuthContext);
  const { lang, sidebarTheme } = appContext;

  return (
    <StyledNavigationWrapper>
      <StyledSidebarNav id="top-navigation" className={sidebarTheme}>
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
            <hr />
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
          </>
        )}
      </StyledSidebarNav>
    </StyledNavigationWrapper>
  );
};

export default SideBar;
