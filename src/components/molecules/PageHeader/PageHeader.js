import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from 'components/atoms/Divider/Divider';

const StyledHeaderWrapper = styled.div`
  padding: 10px 0 0 0;
  width: 100%;
  margin: 10px 0 0 0;
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
