import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'

import Loader from './Loader'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <Loader as="span" />,
})

const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ['bold', 'italic', 'underline'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
    ],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
]

const HTMLEditor = (props:any) => {
  const quillEditor: any = useRef();
  //const [editor_value, setEditorValue] = useState('');
  //console.log(editor_value)

  type EditorContent = Element | null
  let quillEditorNode: EditorContent = document.querySelector(".ql-editor") as HTMLElement;

  return(
    <div className="html-editor">
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder='Enter the information to request here...'
        onChange={(e) => { props.onContentChange(e); }} //setEditorValue(e);
        //onChange={(content:any) => handleReqInfo(content)} 
        //ref={quillEditor}
      />
    </div>
  )
}

export default HTMLEditor