import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// CKEditor config:
let editorConfig = {
  // removePlugins: [ 'heading', 'link' ],
  // toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
  // heading: {
  //   options: [
  //     { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
  //     { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
  //     { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
  //   ]
  // }
};
// Show all plugins for CKEditor:
// console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

class TextEditor extends Component {
  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Type something.</p>"
          config={editorConfig}
          onInit={ editor => {
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            this.setState({content: data});
            // this.state.content = data;

            // console.log( { event, editor, data } );
          } }
          onBlur={ editor => {
            // console.log( 'Blur.', editor );
          } }
          onFocus={ editor => {
            // console.log( 'Focus.', editor );
          } }
          disabled={false}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {};

export default TextEditor;