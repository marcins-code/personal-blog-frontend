import React, { useContext } from 'react';
import { PageContext } from 'context';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/menus';
import { darken } from 'polished';

const StyleMobileNavWrapper = styled.div`
  z-index: 310;
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-image: url(${({ theme }) => theme.menuBackgrounImage});
  background-color: ${({ theme }) => darken(0.1, theme.appBackgroundColor)};
  position: fixed;
  top: 0;
  box-shadow: 10px 0 7px rgba(0, 0, 0, 0.4);
  margin-left: -290px;
  transition: all 500ms;
  &.isShown {
    margin-left: 0px;
  }
`;

const StyledList = styled.ul`
  margin: 10px 20px;
  display: block !important;
  list-style: none;

  > li {
    margin: 20px 10px;
    > a {
      text-decoration: none;
      line-height: 2.2rem;
      font-size: 2rem;
      font-weight: bold;
      font-family: 'Baloo 2', sans-serif;
      text-transform: uppercase;
      text-shadow: ${({ theme }) => theme.menuTextShadow};
      color: ${({ theme }) => theme.color};
      position: relative;

      &:before {
        content: '';
        font-style: italic;
        font-size: 2rem;
        text-transform: lowercase;
        font-family: 'Patrick Hand', cursive;
        color: #00bfeb;
        position: absolute;
        bottom: 7px;
        vertical-align: text-bottom;
      }

      &.active {
        :before {
          content: 'this.';
          left: -37px;
          color: #ff6315;
        }
      }
    }
  }
`;

const MobileNav = ({ isShown }) => {
  const appContext = useContext(PageContext);
  const { lang, isAdminPage } = appContext;
  const menuItems = isAdminPage ? adminMenuItems : mainMenuItems;

  return (
    <StyleMobileNavWrapper className={isShown && 'isShown'}>
      <StyledList>
        {menuItems.map((menuItem) => (
          <li key={menuItem.name_en}>
            <Link as={NavLink} to={menuItem.path} exact={menuItem.exact}>
              {lang === 'pl' ? menuItem.name_pl : menuItem.name_en}
            </Link>
          </li>
        ))}
      </StyledList>
    </StyleMobileNavWrapper>
  );
};

MobileNav.propTypes = {
  isShown: PropTypes.bool.isRequired,
};

export default MobileNav;
