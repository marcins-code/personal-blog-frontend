import React, { useContext } from 'react';
import { AuthContext, PageContext } from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/language';

const StyledList = styled.ul`
  margin: 10px 20px;
  padding: 20px 0;
  display: block !important;
  list-style: none;
  li {
    margin: 22px 0;
  }

  a {
    text-decoration: none;
    line-height: 2.2rem;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Baloo 2', sans-serif;
    /* font-family: "", sans-serif important; */
    text-transform: uppercase;
    text-shadow: 2px 2px 2px black;
    color: ${({ theme }) => theme.grey200};
    margin-left: 45px;
    margin-bottom: 10px;

    &::after,
    ::before {
      content: '';
      font-size: 1.7rem;
      text-transform: lowercase;
      color: #00bfeb;
      line-height: 2rem;
    }

    &.active {
      margin-left: 2.1rem;
      :after {
        content: '';
      }
      :before {
        content: 'this.';
      }
      &::after,
      ::before {
        font-family: 'Patrick Hand', cursive;
        font-style: italic;
        font-size: 1.5rem;
        color: #ff6315;
      }
    }

    &:hover:not(.active) {
      margin-left: 2.21rem;
      :after {
        content: ')';
      }
      :before {
        content: 'use(';
      }

      &::after,
      ::before {
        font-family: 'Patrick Hand', cursive;
        font-style: italic;
        font-size: 1.5rem;
      }
    }
  }
`;

const StyledSidebarWrapper = styled.nav`
  min-width: 250px;
  max-width: 250px;
  height: 100vh;
  left: 0;
  top: 0;
  margin: 0;
  position: absolute;
  background-color: #454545;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    url('https://www.transparenttextures.com/patterns/random-grey-variations.png');
  box-shadow: -5px 0 20px 4px rgba(0, 0, 0, 0.9);
  &.dark {
    background-color: #454545;
  }

  &.light {
    background-color: #c3c3c3;
    & > ul > li a {
      color: #282a35;
      text-shadow: 1px 1px 1px #484b60;
      &.active {
        &::before,
        ::after {
          color: #c93600;
        }
      }

      &:hover:not(.active) {
        margin-left: 11px;
        &::before,
        ::after {
          color: #0038cc;
        }
      }
    }
  }

  &.chocolate {
    background-color: #6d2a19;
  }

  &.blue {
    background-color: #004e73;
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
      <StyledSidebarWrapper id="top-navigation" className={sidebarTheme}>
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
              <Link onClick={authContext.logout}>Logout</Link>
            </StyledList>
          </>
        )}
      </StyledSidebarWrapper>
    </StyledNavigationWrapper>
  );
};

export default SideBar;
