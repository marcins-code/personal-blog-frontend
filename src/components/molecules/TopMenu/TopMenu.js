import React, { useContext } from 'react';
import PageContext from 'context';
import styled from 'styled-components';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/language';

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;

  li {
    margin: 0 10px;
  }

  a {
    text-decoration: none;
    font-family: 'Baloo 2', sans-serif;
    line-height: 2.2rem;
    text-transform: uppercase;
    /* font-family: 'Open Sans Condensed', sans-serif; */
    font-size: 2rem;
    text-decoration: none;
    color: #e5e5e5;
    display: flex;
    text-transform: uppercase;
    align-items: center;
    font-weight: 600;

    &:after,
    &:before {
      opacity: 0;
      align-items: center;
      color: #ff6315;
      margin-top: -7px;
      font-size: 2.5rem;
      transition: transform 0.3s, opacity 0.2s;
      font-family: 'Lato', sans-serif;
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
  /* width: 100vw; */
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.3) 100%
    ),
    url('https://www.transparenttextures.com/patterns/dark-denim.png');
  display: flex;
  align-items: center;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: 26px;
  text-shadow: 0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24), 2px 2px 0 rgb(-86, -86, -86),
    3px 3px 2px rgba(0, 0, 0, 0.7), 3px 3px 1px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.2);
`;

const StyledNavigationWrapper = styled.div``;

const TopMenu = () => {
  const appContext = useContext(PageContext);
  const { lang, isAdminPage } = appContext;
  const menuItems = isAdminPage ? adminMenuItems : mainMenuItems;

  return (
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
  );
};

export default TopMenu;
