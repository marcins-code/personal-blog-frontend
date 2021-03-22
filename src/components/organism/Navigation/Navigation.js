import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'components/atoms/Link/Link';
import { NavLink } from 'react-router-dom';

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
    line-height: 2.2rem;
    font-size: 1.6rem;
    text-transform: uppercase;
  }
`;

const StyledNavWrapper = styled.nav`
  &.menu-top {
    height: 80px;
    width: 100vw;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.1) 50%,
        rgba(0, 0, 0, 0.3) 100%
      ),
      url('https://www.transparenttextures.com/patterns/dark-denim.png');
    display: flex;
    align-items: center;
    font-size: 3em;
    line-height: 1em;
    box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.5);
    font-weight: bold;
    font-size: 26px;
    text-shadow: 0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24),
      2px 2px 0 rgb(-86, -86, -86), 3px 3px 2px rgba(0, 0, 0, 0.7), 3px 3px 1px rgba(0, 0, 0, 0.5),
      0px 0px 2px rgba(0, 0, 0, 0.2);
    & > ul > li a {
      font-family: 'Open Sans Condensed', sans-serif;
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: #e5e5e5;
      position: relative;
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
        font-size: 1.8em;
        transition: transform 0.3s, opacity 0.2s;
        font-family: 'Merienda', cursive;
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
  }

  &.sidebar {
    width: 300px;
    height: 100vh;
    left: 0;
    top: 0;
    margin: 0;
    z-index: 10001;
    transform: translateX(0);
    transition: transform 0.2s ease-in-out;
    display: block;
    background-color: #454545;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url('https://www.transparenttextures.com/patterns/random-grey-variations.png');
    box-shadow: 5px 0 10px -4px rgba(0, 0, 0, 0.9);
    & > ul > li a {
      text-shadow: 2px 2px 2px black;
      color: ${({ theme }) => theme.grey200};
    }

    &.hidden {
      transform: translateX(-300px);
    }
    @media (max-width: 768px) {
      position: fixed;
    }

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

    &.chocolade {
      background-color: #6d2a19;
    }

    &.blue {
      background-color: #004e73;
    }

    > ${StyledList} {
      margin: 10px 20px;
      padding: 20px 0;
      display: block !important;
      > li {
        margin: 22px 0;
        a {
          margin-left: 45px;
          margin-bottom: 10px;

          &::after,
          ::before {
            content: '';
            font-size: 1.7rem;
            text-transform: lowercase;
            color: #00bfeb;
          }

          &.active {
            margin-left: 1.05rem;
            :after {
              content: '';
            }
            :before {
              content: 'this.';
            }
            &::after,
            ::before {
              font-family: 'Merienda', cursive;
              font-size: 1.7rem;
              color: #ff6315;
            }
          }
        }

        a:hover:not(.active) {
          margin-left: 11px;
          :after {
            content: ')';
          }
          :before {
            content: 'use(';
          }

          &::after,
          ::before {
            font-family: 'Merienda', cursive;
            font-size: 1.7rem;
          }
        }
      }
    }
  }
`;

const Navigation = ({ classes, langMenu }) => (
  <StyledNavWrapper id="main-navigation" className={classes}>
    <StyledList>
      <li>
        <Link as={NavLink} to="/" exact>
          {langMenu.homepage}
        </Link>
      </li>
      <li>
        <Link as={NavLink} to="/categories">
          {langMenu.categories}
        </Link>
      </li>
      <li>
        <Link as={NavLink} to="/series">
          {langMenu.series}
        </Link>
      </li>
      <li>
        <Link as={NavLink} to="/contact">
          {langMenu.contact}
        </Link>
      </li>
    </StyledList>
  </StyledNavWrapper>
);

Navigation.propTypes = {
  classes: PropTypes.instanceOf(Array).isRequired,
  langMenu: PropTypes.instanceOf(Object).isRequired,
};

export default Navigation;
