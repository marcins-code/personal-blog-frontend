import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.8);
  z-index: 301;
  top: 0;
  left: 0;
  opacity: 1;
  animation: fadein 300ms;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Backdrop;
