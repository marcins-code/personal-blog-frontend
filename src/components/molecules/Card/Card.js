import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { transparentize, darken } from 'polished';
import { device } from 'themes/commonElements/mediaBreakpoints';

const StyledCardBody = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.28);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
padding-bottom: 20px;
  ${(props) => props.cardSmall
    && css`
      @media ${device.max.tablet} {
        max-width: 75%;
      }
      @media ${device.min.tablet} {
        max-width: 50%;
      }

      @media ${device.min.laptopL} {
        max-width: 35%;
      }
    `}

  ${(props) => props.cardMedium
    && css`
      @media ${device.max.tablet} {
        max-width: 95%;
      }
      @media ${device.min.tablet} {
        max-width: 65%;
      }

      @media ${device.min.laptopL} {
        max-width: 45%;
      }
    `}

  ${(props) => props.cardCenter
    && css`
      margin: auto;
    `}

    ${(props) => props.cardColor
      && css`
        background: ${({ theme }) => transparentize(0.6, theme[props.cardColor])};
      `}

      ${(props) => props.cardAsTemplate
        && css`
          background: ${({ theme }) => transparentize(0.45, darken(0.2, theme.appBackgroundColor))};
        `}

`;

const StyledCardTitle = styled.h3`
  margin: 10px 10px 10px 20px;
  border-bottom: solid black 2px;
`;

const StyledCardContent = styled.div`
  padding: 0px 20px;
`;

const StyledCardFooter = styled.div``;

const Card = ({
  title,
  children,
  footer,
  cardSmall,
  cardCenter,
  cardMedium,
  cardColor,
  cardAsTemplate,
}) => (
  <StyledCardBody
    cardColor={cardColor}
    cardSmall={cardSmall}
    cardCenter={cardCenter}
    cardMedium={cardMedium}
    cardAsTemplate={cardAsTemplate}
  >
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
  cardColor: PropTypes.string,
  cardAsTemplate: PropTypes.bool,
};

Card.defaultProps = {
  title: '',
  footer: '',
  cardSmall: false,
  cardCenter: false,
  cardMedium: false,
  cardColor: '',
  cardAsTemplate: false,
};

export default Card;
