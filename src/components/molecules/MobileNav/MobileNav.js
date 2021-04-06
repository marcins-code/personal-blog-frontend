import React, { useContext } from 'react';
import { PageContext } from 'context';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';
import { mainMenuItems, adminMenuItems } from 'languages/language';

const StyleMobileNavWrapper = styled.div`
  z-index: 200;
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url('assets/images/black-orchid.png');
  background-color: ${({ theme }) => theme.dark.backgroundColor};
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 100%),
    url(${({ theme }) => theme.backgroundImages.textile});
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
  padding: 20px 0;
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
      /* font-family: "", sans-serif important; */
      text-transform: uppercase;
      text-shadow: 2px 2px 2px black;
      color: ${({ theme }) => theme.grey200};
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
