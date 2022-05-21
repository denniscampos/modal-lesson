import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modulesQuill = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formatsQuill = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const Editor = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>Editor component</h1>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modulesQuill}
        formats={formatsQuill}
      />
    </div>
  );
};

export default Editor;
