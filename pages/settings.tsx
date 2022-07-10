import { supabase } from '@/lib/supabaseClient';
import React, { useState } from 'react';
import { useQuery, UseMutateFunction, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetServerSideProps } from 'next';

import { CreateUpdateProfileForm } from '@/components/UseForm';

export interface ProfileDataProps {
  id?: string;
  first_name?: string;
  last_name?: string;
  website?: string;
  about?: string;
  email?: string;
  avatar_url?: string;
}

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const user = supabase.auth.user();

  const { data } =
    useQuery('profile', fetchProfileData, {
      refetchOnWindowFocus: false,
    }) || {};

  const createOrUpdateProfile = async (data: ProfileDataProps): Promise<void> => {
    try {
      setLoading(true);

      const { website, first_name, last_name, about, email, avatar_url } = data;

      const PROFILE_DATA = {
        id: user?.id,
        first_name,
        last_name,
        website,
        about,
        email,
        avatar_url,
      };

      const { error } = await supabase
        .from('profile')
        .upsert(PROFILE_DATA, { returning: 'minimal' });

      if (error) {
        alert(error);
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {data ? (
        <CreateUpdateProfileForm
          profile={data}
          createOrUpdateProfile={createOrUpdateProfile}
          loading={loading}
        />
      ) : null}
    </>
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

  return {
    props: { user },
  };
};

const fetchProfileData = async () => {
  const user = supabase.auth.user();
  try {
    const { data, error } = await supabase.from('profile').select('*').eq('id', user?.id).single();

    if (error) {
      // handle this better.
      throw new Error('something went wrong');
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
