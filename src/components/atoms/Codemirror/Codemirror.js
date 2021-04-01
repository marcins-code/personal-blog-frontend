/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/mode/css/css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import styled from 'styled-components';
import './Codemirror.css';

const StyledEditorWrapper = styled.div`
  box-shadow: 0px 4px 4px -2px black;
  border-radius: 20px;
  min-height: 30vh;
  overflow: hidden;
  position: relative;
`;

// eslint-disable-next-line react/prop-types
const Codemirror = ({ setStateFunc, codeValue }) => (
  <StyledEditorWrapper>
    <CodeMirror
      value={codeValue || '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}
      onBeforeChange={(editor, data, value) => {
        setStateFunc(value);
      }}
      autoCursor={false}
      // onChange={(editor, data, value) => {
      // }}
      options={{
        theme: 'dracula',
        lineNumbers: true,
        tabSize: 2,
        keyMap: 'sublime',
        mode: 'htmlmixed',
        viewportMargin: 20,
        scrollbarStyle: null,
        autoCloseTags: true,
        lineWrapping: true,
        extraKeys: {
          // eslint-disable-next-line func-names
          'Ctrl-Q': function (cm) {
            cm.foldCode(cm.getCursor());
          },
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      }}
    />
  </StyledEditorWrapper>
);

Codemirror.propTypes = {
  // value: PropTypes.string,
  // setStateFunc: PropTypes.func,
  // style: PropTypes.instanceOf(Object),
};

Codemirror.defaultProps = {
  // value: '',
  //   setStateFunc: undefined,
  //   style: { overflow: 'hidden', borderRadius: '50px' },
  // };
};
export default Codemirror;
