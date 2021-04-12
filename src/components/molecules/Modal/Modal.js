import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './animations.css';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import Divider from 'components/atoms/Divider/Divider';
import { lighten } from 'polished';

const StyledModalBody = styled.div`
  overflow-y: auto;
  z-index: 3100;
  position: fixed;
  margin: 0 auto;
  width: 50%;
  left: 25%;
  top: 12vh;
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  border: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  box-shadow: 0 0 90px -10px ${({ theme }) => lighten(0.1, theme.appBoxShadowColor)} inset,
    0 0 60px -10px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.color};
  height: 500px;
  border-radius: 15px;
  align-self: center;
  /* padding: 20px 0; */
  scrollbar-color: #252525 #282a35;
  scrollbar-width: auto;
  &::-webkit-scrollbar {
    width: 30px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #252525;
    border-radius: 30px; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #282a35; /* color of the scroll thumb */
    border-radius: 200px; /* roundness of the scroll thumb */
  }
`;

const StyledModalHeader = styled.div`
  padding: 10px 20px;
  /* position: fixed; */
  height: 40px;
  /* width: 100%; */
`;

const StyledModalContent = styled.div`
  padding: 70px 30px 40px 30px;
`;

const StyledModalButtons = styled.div``;

const Modal = ({
  modalHeader, modalContent, modalShow, resetFunc,
}) => {
  const content = (
    <>
      {modalShow && <Backdrop onClick={() => resetFunc(null)} />}
      <CSSTransition in={modalShow} mountOnEnter unmountOnExit timeout={1000} classNames="modal">
        <StyledModalBody>
          {modalHeader && (
            <>
              <StyledModalHeader>
                <h4>{modalHeader}</h4>
                <Divider />
              </StyledModalHeader>
            </>
          )}
          <StyledModalContent>
            {modalContent}
            <StyledModalButtons />
          </StyledModalContent>
        </StyledModalBody>
      </CSSTransition>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById('tools-hook'));
};

Modal.propTypes = {
  modalHeader: PropTypes.string,
  modalContent: PropTypes.instanceOf(Object).isRequired,
  modalShow: PropTypes.bool,
  resetFunc: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  modalHeader: null,
  modalShow: false,
};

export default Modal;
