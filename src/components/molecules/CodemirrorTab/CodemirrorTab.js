import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';
import Codemirror from 'components/atoms/Codemirror/Codemirror';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const StyledCompWrapper = styled.div``;

const StyledCodemirrorArea = styled.div``;

const CodemirrorTab = ({
  labelFirst,
  labelSecond,
  titleFirst,
  titleSecond,
  setStateFuncFirst,
  setStateFuncSecond,
  codeValueFirst,
  codeValueSecond,
}) => {
  const [enableFirst, setEnableFirst] = useState(true);
  const [enableSecond, setEnableSecond] = useState(false);

  const enableFirstHandler = useCallback(() => {
    setEnableFirst(true);
    setEnableSecond(false);
  }, [setEnableFirst]);
  const enableSecondHandler = useCallback(() => {
    setEnableFirst(false);
    setEnableSecond(true);
  }, [setEnableSecond]);

  return (
    <StyledCompWrapper>
      <Button
        style={{ marginRight: '20px' }}
        type="button"
        btnColor={enableFirst ? 'blue' : 'dark'}
        btnClick={enableFirstHandler}
      >
        {labelFirst}
      </Button>
      <Button
        type="button"
        btnColor={enableSecond ? 'blue' : 'dark'}
        btnClick={enableSecondHandler}
      >
        {labelSecond}
      </Button>
      {enableFirst ? (
        <CSSTransition in={enableFirst} timeout={2000}>
          <StyledCodemirrorArea>
            <h5 style={{ margin: '20px 0' }}>{titleFirst}</h5>
            <Codemirror setStateFunc={setStateFuncFirst} codeValue={codeValueFirst} />
          </StyledCodemirrorArea>
        </CSSTransition>
      ) : (
        <CSSTransition in={enableFirst} timeout={2000}>
          <StyledCodemirrorArea>
            <h5 style={{ margin: '20px 0' }}>{titleSecond}</h5>
            <Codemirror setStateFunc={setStateFuncSecond} codeValue={codeValueSecond} />
          </StyledCodemirrorArea>
        </CSSTransition>
      )}
    </StyledCompWrapper>
  );
};

CodemirrorTab.propTypes = {
  labelFirst: PropTypes.string,
  labelSecond: PropTypes.string,
  titleFirst: PropTypes.string,
  titleSecond: PropTypes.string,
  setStateFuncFirst: PropTypes.func.isRequired,
  setStateFuncSecond: PropTypes.func.isRequired,
  codeValueFirst: PropTypes.string,
  codeValueSecond: PropTypes.string,
};
CodemirrorTab.defaultProps = {
  labelFirst: 'First',
  labelSecond: 'Second',
  titleFirst: '',
  titleSecond: '',
  codeValueFirst: '',
  codeValueSecond: '',
};

export default CodemirrorTab;
