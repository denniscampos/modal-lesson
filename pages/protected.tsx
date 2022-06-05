import { supabase } from '@/lib/supabaseClient';
import { GetServerSideProps } from 'next';

interface ProtectedProps {
  user: object;
}

export default function Profile({ user }: ProtectedProps) {
  // eslint-disable-next-line no-console
  console.log({ user });

  return (
    <div>
      <h1>hello from protected route!</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: '/login' },
    };
  }

  // do something with user
  return {
    props: { user },
  };
};
