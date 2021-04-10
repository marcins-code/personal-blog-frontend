import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { lighten, darken, transparentize } from 'polished';

const StyledHeaderWrapper = styled.div`
  padding: 10px 0 0 0;
  width: 100%;
  margin: 10px 0 0 0;
`;
const StyledDivider = styled.hr`
  width: 100%;
  margin-bottom: 30px;
  border-width: 2px;
  border-color: ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  box-shadow: 0 0px 1px 0px
    ${({ theme }) => transparentize(0.2, darken(0.1, theme.appBackgroundColor))};
  border-radius: 10px;
`;

const PageHeader = ({ title, icon }) => (
  <>
    <StyledHeaderWrapper>
      <h4>
        {icon && <FontAwesomeIcon icon={icon} transform="left-4" />}
        {title}
      </h4>
    </StyledHeaderWrapper>
    <br />
    <StyledDivider />
  </>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.instanceOf(Array),
};

PageHeader.defaultProps = {
  icon: [],
};

export default PageHeader;
