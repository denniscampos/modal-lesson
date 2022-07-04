import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/hooks/useStore';
import Spinner from './Spinner';

interface PostProps {
  id?: string;
  title?: string;
  text?: string;
}
[];

export default function Post() {
  const [postData, setPostData] = useState<PostProps[]>();
  const [loading, setLoading] = useState(false);

  const user = supabase?.auth?.user();

  const postTitle = useStore((state) => state.postTitle);
  const setPostTitle = useStore((state) => state.setPostTitle);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.from('post').select().eq('user', user?.id);

        if (!data) return null;

        setPostData(data);

        if (error) {
          console.error(error);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user?.id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-5 md:grid-rows-3 max-w-6xl">
          <div className="bg-blue-400">
            <h1 className="font-bold">Monday</h1>
            {postData?.map(({ id, title, text }) => (
              <div key={id}>
                <h1>{title}</h1>
                <p>{text}</p>
              </div>
            ))}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut
              facilis quae? Id necessitatibus sit tenetur est porro!
            </p>
          </div>
          <div className="bg-red-500">
            <h1 className="font-bold">Tuesday</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut
              facilis quae? Id necessitatibus sit tenetur est porro!
            </p>
          </div>
          <div className="bg-gray-500">
            <h1 className="font-bold">Wednesday</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut
              facilis quae? Id necessitatibus sit tenetur est porro!
            </p>
          </div>
          <div className="bg-blue-400">
            <h1 className="font-bold">Thursday</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut
              facilis quae? Id necessitatibus sit tenetur est porro!
            </p>
          </div>
          <div className="bg-red-500">
            <h1 className="font-bold">Friday</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui assumenda ut
              facilis quae? Id necessitatibus sit tenetur est porro!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
