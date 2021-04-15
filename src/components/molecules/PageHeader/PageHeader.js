import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from 'components/atoms/Divider/Divider';

const StyledHeaderWrapper = styled.div`
  width: 100%;
`;

const StyledHeader = styled.h4`
  margin-bottom: 0;
`;
const PageHeader = ({ title, icon }) => (
  <>
    <StyledHeaderWrapper>
      <StyledHeader>
        {icon && <FontAwesomeIcon icon={icon} transform="left-4" />}
        {title}
      </StyledHeader>
    </StyledHeaderWrapper>
    <br />
    <Divider />
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
