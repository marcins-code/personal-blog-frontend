import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { lighten } from 'polished';
import './animations.css';
import { PageContext } from 'context';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import Divider from 'components/atoms/Divider/Divider';
import { commonFormPhrazes } from 'languages/commonFormPhrazes';
import Button from 'components/atoms/Button/Button';

const StyledModalBody = styled.div`
  position: fixed;
  width: 40%;
  height: 40%;
  left: 30%;
  top: 12vh;
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  border: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  box-shadow: 0 0 90px -10px ${({ theme }) => lighten(0.1, theme.appBoxShadowColor)} inset,
    0 0 60px -10px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.color};
  border-radius: 15px;
  z-index: 3100;
  ${(props) => props.modalSmall
    && css`
      width: 25%;
      height: 25%;
      left: 37.5%;
    `}
  ${(props) => props.modalBig
    && css`
      width: 65% !important;
      height: 65%;
      left: 17.5%;
    `}
`;

const StyledModalHeader = styled.div`
  padding: 10px 20px;
  height: 40px;
  margin-bottom: 10px;
`;

const StyledModalContent = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 63%;
  margin: 30px 0 5px 0;
  padding: 10px 30px;
  ${(props) => props.modalBig
    && css`
      height: 76%;
    `}

  ${(props) => props.modalSmall
    && css`
      height: 40%;
    `}
      scrollbar-color: black green;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 9px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.appBackgroundColor};
    border-radius: 20px;
    overflow: hidden;
    margin: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => lighten(0.1, theme.appBackgroundColor)};
    border-radius: 200px;
  }
`;

// const StyledModalContent = styled.div``;

const StyledModalButtons = styled.div`
  position: absolute;
  bottom: 0;
  padding: 15px 10px;
  width: 100%;
  > button {
    margin-right: 20px;
  }
`;

const Modal = ({
  modalHeader,
  modalContent,
  modalShow,
  resetFunc,
  modalSmall,
  modalBig,
  buttonClose,
  buttonConfirmDanger,
  buttonConfirmDangerLabel,
  buttonConfirmDangerLabelIcon,
  confirmDangerFunc,
  buttonConfirmSucess,
  buttonConfirmSuccessLabel,
  buttonConfirmSuccessLabelIcon,
  confirmSuccessFunc,
  noBackdropClose,
}) => {
  const { lang } = useContext(PageContext);

  const content = (
    <>
      {modalShow && <Backdrop onClick={() => !noBackdropClose && resetFunc(null)} />}
      <CSSTransition in={modalShow} mountOnEnter unmountOnExit timeout={1000} classNames="modal">
        <StyledModalBody modalSmall={modalSmall} modalBig={modalBig}>
          {modalHeader && (
            <>
              <StyledModalHeader>
                <h4>{modalHeader}</h4>
                <Divider />
              </StyledModalHeader>
            </>
          )}
          <StyledModalContent modalBig={modalBig} modalSmall={modalSmall}>
            {modalContent}
          </StyledModalContent>
          <StyledModalButtons>
            <Divider style={{ marginBottom: '10px' }} />
            {buttonClose && (
              <Button
                btnColor="primary"
                labelIcon={['far', 'times-circle']}
                label={commonFormPhrazes[lang].close}
                btnClick={() => resetFunc(null)}
              />
            )}
            {buttonConfirmDanger && (
              <>
                <Button
                  btnColor="danger"
                  labelIcon={buttonConfirmDangerLabelIcon}
                  label={buttonConfirmDangerLabel || commonFormPhrazes[lang].confirm}
                  btnClick={confirmDangerFunc}
                />
                <Button
                  btnColor="dark"
                  labelIcon={['far', 'times-circle']}
                  label={commonFormPhrazes[lang].cancel}
                  btnClick={() => resetFunc(null)}
                />
              </>
            )}
            {buttonConfirmSucess && (
              <>
                <Button
                  btnColor="success"
                  labelIcon={buttonConfirmSuccessLabelIcon || ['fas', 'check']}
                  label={buttonConfirmSuccessLabel || commonFormPhrazes[lang].confirm}
                  btnClick={confirmSuccessFunc}
                />
                <Button
                  btnColor="dark"
                  labelIcon={['far', 'times-circle']}
                  label={commonFormPhrazes[lang].cancel}
                  btnClick={() => resetFunc(null)}
                />
              </>
            )}
          </StyledModalButtons>
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
  modalSmall: PropTypes.bool,
  modalBig: PropTypes.bool,
  buttonClose: PropTypes.bool,
  buttonConfirmDanger: PropTypes.bool,
  confirmDangerFunc: PropTypes.func,
  buttonConfirmDangerLabel: PropTypes.string,
  buttonConfirmDangerLabelIcon: PropTypes.instanceOf(Array),
};

Modal.defaultProps = {
  modalHeader: null,
  modalShow: false,
  modalSmall: false,
  modalBig: false,
  buttonClose: false,
  buttonConfirmDanger: false,
  confirmDangerFunc: undefined,
  buttonConfirmDangerLabel: null,
  buttonConfirmDangerLabelIcon: [],
};

export default Modal;

// TODO scroll styles
