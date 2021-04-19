import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { lighten } from 'polished';
import { PageContext } from 'context';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import { commonPhrazes } from 'languages/commonPhrazes';
import Button from 'components/atoms/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'assets/css/animations.css';

const StyledModalBody = styled.div`
  position: fixed;
  width: 40%;
  height: 40%;
  left: 30%;
  top: 12vh;
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  border: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  box-shadow: 0 0 40px -10px ${({ theme }) => lighten(0.1, theme.appBoxShadowColor)} inset,
    0 0 130px -10px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.color};
  border-radius: 15px;
  z-index: 3100;
  ${(props) => props.mdlSmall
    && css`
      width: 25%;
      height: 25%;
      left: 37.5%;
    `}
  ${(props) => props.mdlBig
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
  ${(props) => props.mdlBig
    && css`
      height: 76%;
    `}

  ${(props) => props.mdlSmall
    && css`
      height: 40%;
    `}
      scrollbar-color: ${({ theme }) => theme.appBackgroundColor};
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

const StyledModalButtonsWrapper = styled.div`
  overflow: hidden;
  border-radius: 0 0 13px 13px;
  position: absolute;
  bottom: 0;
  padding: 0 10px 10px 10px;
  border-top: groove 3px ${({ theme }) => lighten(0.05, theme.appBackgroundColor)};
  width: 100%;
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};

  > button {
    margin: 10px 10px 0 0;
    & > svg {
      color: '#fff';
    }
  }
`;

const Modal = ({
  mdlHeader,
  mdlHeaderIcon,
  children,
  mdlShow,
  resetFunc,
  mdlSmall,
  mdlBig,
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
      <Backdrop onClick={() => !noBackdropClose && resetFunc(null)} bckdShow={mdlShow} />
      <CSSTransition
        in={mdlShow}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        classNames={{ enter: 'scale-in-ver-center', exit: 'scale-out-vertical' }}
      >
        <StyledModalBody mdlSmall={mdlSmall} mdlBig={mdlBig}>
          {mdlHeader && (
            <>
              <StyledModalHeader>
                <h4>
                  {mdlHeaderIcon && (
                    <FontAwesomeIcon icon={mdlHeaderIcon} style={{ marginRight: '10px' }} />
                  )}
                  {mdlHeader}
                </h4>
              </StyledModalHeader>
            </>
          )}
          <StyledModalContent mdlBig={mdlBig} mdlSmall={mdlSmall}>
            {children}
          </StyledModalContent>
          <StyledModalButtonsWrapper>
            {buttonClose && (
              <Button type="button" btnColor="blue" btnClick={() => resetFunc(null)}>
                <FontAwesomeIcon icon={['far', 'times-circle']} fixedWidth />
                {' '}
                {commonPhrazes[lang].close}
              </Button>
            )}
            {buttonConfirmDanger && (
              <>
                <Button type="button" btnColor="red" btnClick={confirmDangerFunc}>
                  <FontAwesomeIcon icon={buttonConfirmDangerLabelIcon} />
                  {' '}
                  {buttonConfirmDangerLabel || commonPhrazes[lang].confirm}
                </Button>
                <Button type="button" btnColor="dark" btnClick={() => resetFunc(null)}>
                  <FontAwesomeIcon icon={['far', 'times-circle']} fixedWidth />
                  {' '}
                  {commonPhrazes[lang].cancel}
                </Button>
              </>
            )}
            {buttonConfirmSucess && (
              <>
                <Button
                  type="button"
                  btnColor="green"
                  labelIcon={buttonConfirmSuccessLabelIcon || ['fas', 'check']}
                  label={buttonConfirmSuccessLabel || commonPhrazes[lang].confirm}
                  btnClick={confirmSuccessFunc}
                >
                  <FontAwesomeIcon
                    icon={buttonConfirmSuccessLabelIcon || ['fas', 'check']}
                    fixedWidth
                  />
                  {' '}
                  {buttonConfirmSuccessLabel || commonPhrazes[lang].confirm}
                </Button>
                <Button type="button" btnColor="dark" btnClick={() => resetFunc(null)}>
                  <FontAwesomeIcon icon={['far', 'times-circle']} fixedWidth />
                  {' '}
                  {commonPhrazes[lang].cancel}
                </Button>
              </>
            )}
          </StyledModalButtonsWrapper>
        </StyledModalBody>
      </CSSTransition>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById('tools-hook'));
};

Modal.propTypes = {
  mdlHeader: PropTypes.PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  mdlHeaderIcon: PropTypes.instanceOf(Array),
  children: PropTypes.node,
  mdlShow: PropTypes.bool,
  resetFunc: PropTypes.func.isRequired,
  mdlSmall: PropTypes.bool,
  mdlBig: PropTypes.bool,
  buttonClose: PropTypes.bool,
  buttonConfirmDanger: PropTypes.bool,
  confirmDangerFunc: PropTypes.func,
  buttonConfirmDangerLabel: PropTypes.string,
  buttonConfirmDangerLabelIcon: PropTypes.instanceOf(Array),
};

Modal.defaultProps = {
  mdlHeader: null,
  mdlHeaderIcon: [],
  mdlShow: false,
  mdlSmall: false,
  mdlBig: false,
  buttonClose: false,
  buttonConfirmDanger: false,
  confirmDangerFunc: undefined,
  buttonConfirmDangerLabel: null,
  buttonConfirmDangerLabelIcon: [],
  children: undefined,
};

export default Modal;

// TODO scroll styles and RWD size
