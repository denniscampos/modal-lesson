import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ToastContainer, toast } from 'react-toastify';
import { useQueryClient, useMutation } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/hooks/useStore';
import Label from '@/components/common/Label';
import Input from '@/components/common/Input';
import Spinner from '@/components/Spinner';
import Button from '@/components/common/Button';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function TextEditor({ setIsOpen }: Props) {
  const [loading, setLoading] = useState(false);

  const postTitle = useStore((state) => state.postTitle);
  const setPostTitle = useStore((state) => state.setPostTitle);
  const postText = useStore((state) => state.postText);
  const setPostText = useStore((state) => state.setPostText);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  //TODO: add protected route when posting.
  const queryClient = useQueryClient();

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
          autoClose: 3000,
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

  const mutation = useMutation(createLessonPlan, {
    // for reference: https://codesandbox.io/s/7higb?file=/pages/index.js:429-465
    onSettled: () => {
      queryClient.invalidateQueries('post');
    },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <Label className="text-xl" htmlFor="title">
        Title
      </Label>
      <Input
        type="text"
        name="title"
        id="title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value)}
      />
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
          <Button variant="primary" onClick={mutation.mutate}>
            <span>Post</span>
          </Button>
        )}
      </div>
    </>
  );
}
