import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { supabase } from '@/lib/supabaseClient';
import Label from '@/components/common/Label';
import Input from '@/components/common/Input';
import Spinner from '@/components/Spinner';
import Button from '@/components/common/Button';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function TextEditor({ setIsOpen }: Props) {
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  //TODO: add protected route when posting.

  const user = supabase.auth.user();
  const createLessonPlan = async () => {
    try {
      setLoading(true);

      const PostData = {
        title: postTitle,
        text: postText,
        user: user?.id,
      };
      const { data, error } = await supabase.from('post').insert(PostData);

      if (data) {
        toast.success('Lesson Plan Created Successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (error) {
        toast.error(error?.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <Label className="text-xl" htmlFor="title">
        Title
      </Label>
      <Input type="text" name="title" id="title" onChange={(e) => setPostTitle(e.target.value)} />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={(newValue) => setPostText(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],

          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <div className="mt-4">
        {!user ? (
          <div className="flex items-center">
            <Button variant="primary" onClick={createLessonPlan} disabled>
              <span>Post</span>
            </Button>
            <p className="text-red-500 ml-3 font-bold">You must login to post!</p>
          </div>
        ) : (
          <Button variant="primary" onClick={createLessonPlan}>
            <span>Post</span>
          </Button>
        )}
      </div>
    </>
  );
}
