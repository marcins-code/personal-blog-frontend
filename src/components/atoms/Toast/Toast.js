/* eslint-disable no-unused-vars */
import { ToastContainer } from 'react-toastify';
import styled, { css } from 'styled-components';
import {
  getContrast, darken, lighten, adjustHue, transparentize,
} from 'polished';
import { commonColors } from 'themes/commonElements/commonColors';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const baseRadialGradient = ({ color }) => `
  background: radial-gradient(
        ellipse at bottom right,
        ${darken(0.05, color)} 50%,
        ${darken(0.15, color)} 100%
      );
`;

export const StyledToastsContainer = styled(ToastContainer).attrs({})`
  .Toastify__toast-container {
    box-shadow: 0 0 140px 3px black !important;
  }
  .Toastify__toast {
    box-shadow: 0 0 40px -5px black !important;
    border-radius: 10px;
  }

  .Toastify__toast--success {
  }
  /* .Toastify__toast--success { background: red } */

  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
  .Toastify__toast--dark {
    ${baseRadialGradient({ color: commonColors.dark })};
  }
  .Toastify__progress-bar--dark {
    ${baseRadialGradient({ color: lighten(0.15, commonColors.dark) })};
  }

  .Toastify__toast--error {
    ${baseRadialGradient({ color: lighten(0.15, commonColors.red) })};
  }
  .Toastify__progress-bar--error {
    ${baseRadialGradient({ color: lighten(0.25, commonColors.red) })};
    border-radius: 5px;
  }

  .Toastify__toast--warning {
    ${baseRadialGradient({ color: commonColors.yellow })};
  }
  .Toastify__progress-bar--warning {
    ${baseRadialGradient({ color: lighten(0.15, commonColors.yellow) })};
    border-radius: 5px;
  }

  .Toastify__toast--success {
    ${baseRadialGradient({ color: lighten(0.15, commonColors.green) })};
  }
  .Toastify__progress-bar--success {
    ${baseRadialGradient({ color: lighten(0.25, commonColors.green) })};
    border-radius: 5px;
  }
  .Toastify__toast--info {
    ${baseRadialGradient({ color: lighten(0.15, commonColors.blue) })};
  }
  .Toastify__progress-bar--info {
    ${baseRadialGradient({ color: lighten(0.25, commonColors.blue) })};
    border-radius: 5px;
  }
`;
