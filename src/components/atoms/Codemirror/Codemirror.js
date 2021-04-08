import React from 'react';
import PropTypes from 'prop-types';
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
import './Codemirror.css';

const Codemirror = ({ setStateFunc, codeValue }) => (
  <CodeMirror
    value={codeValue || '\n\n\n\n\n'}
    autoCursor={false}
    onChange={(editor, data, value) => {
      setStateFunc(value);
    }}
    // onBeforeChange={(editor, data, value) => {};
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
    }}
  />
);

Codemirror.propTypes = {
  codeValue: PropTypes.string,
  setStateFunc: PropTypes.func,
};

Codemirror.defaultProps = {
  codeValue: '',
  setStateFunc: undefined,
};
export default Codemirror;
