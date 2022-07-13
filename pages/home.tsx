import { useEffect, useState } from 'react';
import Head from 'next/head';
import { PlusSmIcon } from '@heroicons/react/solid';
import { useQuery } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '@/components/Spinner';
import Heading from '@/components/common/Heading';
import Button from '@/components/common/Button';

import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

async function fetchMyData() {
  const user = await supabase.auth.user();

  const { data } = await supabase.from('post').select().eq('user', user?.id);

  return data;
}

const Post = () => {
  const [loggedInUser, setloggedInUser] = useState<User | null>();
  // const [loading, setLoading] = useState(false);

  const user = supabase.auth.user();

  useEffect(() => {
    // I feel there's a better wait for this.
    setloggedInUser(user);
  }, [user]);

  const {
    data: postMyData,
    isLoading,
    isFetching,
  } = useQuery('post', fetchMyData, { refetchOnWindowFocus: false, refetchOnMount: true }) || {};

  if (isLoading && isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <Head>
        <title>Modal Lesson 🚀</title>
        <meta name="description" content="Post page to create lesson" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between mb-5">
            <Heading variant="h2" className="text-primary text-7xl cypressTest">
              Welcome {!loggedInUser ? 'Guest 🚀' : loggedInUser?.email + '🚀'}
            </Heading>

            <Button
              //   onClick={() => console.log('clicked')}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary shadow-sm hover:bg-medium-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span>New Post</span>
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-5 md:grid-rows-3 max-w-6xl">
            <div className="bg-blue-400">
              <h1 className="font-bold">Monday</h1>
              <div>
                {postMyData?.map((post) => (
                  <div key={post.id}>
                    <h1 className="text-xl">{post.title}</h1>
                    <p className="text-red-500">{post.text}</p>
                  </div>
                ))}
              </div>
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
        </div>
      )}
    </div>
  );
};

export default Post;
