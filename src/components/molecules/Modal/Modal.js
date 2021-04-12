import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { lighten } from 'polished';
import './animations.css';
import { PageContext } from 'context';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import { commonPhrazes } from 'languages/commonPhrazes';
import Button from 'components/atoms/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  height: 70px;
  /* margin-bottom: 10px; */
  border-bottom: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
`;

const StyledModalContent = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 63%;
  margin-top: 10px;
  padding: 0 25px 10px 25px;
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

const StyledModalButtons = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0 10px 10px 10px;
  border-top: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  width: 100%;
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  > button {
    margin: 10px 10px 0 0;
  }
`;

const Modal = ({
  modalHeader,
  modalHeaderIcon,
  children,
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
                <h4>
                  {modalHeaderIcon && (
                    <FontAwesomeIcon icon={modalHeaderIcon} style={{ marginRight: '10px' }} />
                  )}
                  {modalHeader}
                </h4>
              </StyledModalHeader>
            </>
          )}
          <StyledModalContent modalBig={modalBig} modalSmall={modalSmall}>
            {children}
          </StyledModalContent>
          <StyledModalButtons>
            {buttonClose && (
              <Button
                type="button"
                btnColor="primary"
                labelIcon={['far', 'times-circle']}
                label={commonPhrazes[lang].close}
                btnClick={() => resetFunc(null)}
              />
            )}
            {buttonConfirmDanger && (
              <>
                <Button
                  type="button"
                  btnColor="danger"
                  labelIcon={buttonConfirmDangerLabelIcon}
                  label={buttonConfirmDangerLabel || commonPhrazes[lang].confirm}
                  btnClick={confirmDangerFunc}
                />
                <Button
                  type="button"
                  btnColor="dark"
                  labelIcon={['far', 'times-circle']}
                  label={commonPhrazes[lang].cancel}
                  btnClick={() => resetFunc(null)}
                />
              </>
            )}
            {buttonConfirmSucess && (
              <>
                <Button
                  type="button"
                  btnColor="success"
                  labelIcon={buttonConfirmSuccessLabelIcon || ['fas', 'check']}
                  label={buttonConfirmSuccessLabel || commonPhrazes[lang].confirm}
                  btnClick={confirmSuccessFunc}
                />
                <Button
                  type="button"
                  btnColor="dark"
                  labelIcon={['far', 'times-circle']}
                  label={commonPhrazes[lang].cancel}
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
  modalHeaderIcon: PropTypes.instanceOf(Array),
  children: PropTypes.node.isRequired,
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
  modalHeaderIcon: [],
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
