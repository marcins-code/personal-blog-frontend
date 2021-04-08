import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledCardBody = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.28);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 0 5px rgba(0, 0, 0, 0.3);
  /* color: #999; */
  /* text-shadow: 0 1px 0 rgba(0, 0, 0, 1); */
  padding: 20px;
  border-radius: 10px;
  ${(props) => props.cardSmall
    && css`
      max-width: 30%;
    `}

    ${(props) => props.cardMedium
      && css`
        max-width: 50%;
      `}

  ${(props) => props.cardCenter
    && css`
      margin: auto;
    `}
`;

const StyledCardTitle = styled.h2``;

const StyledCardContent = styled.div``;

const StyledCardFooter = styled.div``;

const Card = ({
  title, children, footer, cardSmall, cardCenter, cardMedium,
}) => (
  <StyledCardBody cardSmall={cardSmall} cardCenter={cardCenter} cardMedium={cardMedium}>
    {title && <StyledCardTitle>{title}</StyledCardTitle>}
    <StyledCardContent>{children}</StyledCardContent>
    {footer && <StyledCardFooter>{footer}</StyledCardFooter>}
  </StyledCardBody>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.string,
  cardSmall: PropTypes.bool,
  cardCenter: PropTypes.bool,
  cardMedium: PropTypes.bool,
};

Card.defaultProps = {
  title: '',
  footer: '',
  cardSmall: false,
  cardCenter: false,
  cardMedium: false,
};

export default Card;
