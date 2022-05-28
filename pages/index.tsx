import type { NextPage } from 'next';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

import Editor from '@/components/Editor';
import P from '@/components/common/P';
import Spinner from '@/components/Spinner';

const POST_QUERY = gql`
  query MyQuery {
    getPostList {
      id
      text
      title
    }
  }
`;

const Home: NextPage = () => {
  const { data: postData, loading: postLoading, error: postError } = useQuery(POST_QUERY);

  if (!postData) {
    return null;
  }

  if (postLoading) {
    return <Spinner />;
  }

  if (postError) {
    return <P variant="p1">something went wrong...</P>;
  }

  return (
    <div>
      <Head>
        <title>Modal Lesson 🚀</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-orange-600 text-7xl">MODAL LESSON VIBES! 🚀</h1>

      <Editor />
    </div>
  );
};

export default Home;
