import styled from 'styled-components';
import { lighten, darken, transparentize } from 'polished';

const Divider = styled.hr`
  width: 100%;
  margin-bottom: 0px;
  border-width: 2px;
  border-color: ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  box-shadow: 0 0px 1px 0px
    ${({ theme }) => transparentize(0.2, darken(0.1, theme.appBackgroundColor))};
  border-radius: 10px;
`;

export default Divider;
