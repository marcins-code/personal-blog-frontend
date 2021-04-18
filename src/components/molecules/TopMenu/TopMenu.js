import React, { useContext } from 'react';
import { PageContext } from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/menus';
import { CSSTransition } from 'react-transition-group';
import { darken } from 'polished';

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
  z-index: 301;
`;

const TopMenu = () => {
  const appContext = useContext(PageContext);
  const { lang, isAdminPage, navPosition } = appContext;
  const menuItems = isAdminPage ? adminMenuItems : mainMenuItems;

  return (
    <CSSTransition
      in={navPosition === 'menu-top'}
      timeout={900}
      classNames="menu-top"
      unmountOnExit
    >
      <StyledNavigationWrapper>
        <StyledTopMenuNavWrapper id="top-navigation">
          <StyledList>
            {menuItems.map((menuItem) => (
              <li key={menuItem.name_en}>
                <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
                  {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
                </Link>
              </li>
            ))}
          </StyledList>
        </StyledTopMenuNavWrapper>
      </StyledNavigationWrapper>
    </CSSTransition>
  );
};

export default TopMenu;
