import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

//double header is showing due to react 18.... keeping an eye on a merge
// https://github.com/zenoamaro/react-quill/pull/793
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
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modulesQuill}
        formats={formatsQuill}
      />
    </>
  );
};

export default Editor;
