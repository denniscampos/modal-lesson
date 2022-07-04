import { supabase } from '@/lib/supabaseClient';
import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '@/components/Spinner';
import Input from '@/components/common/Input';
import { Avatar } from '@/components/Avatar';
import { GetServerSideProps } from 'next';
import Label from '@/components/common/Label';
import { useForm } from 'react-hook-form';
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

  const { data } = useQuery('profile', fetchProfileData, {
    refetchOnWindowFocus: false,
  });

  const { website, about, first_name, last_name, email, avatar_url } = data || {};

  //TODO: check if data is blank before rendering component.

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      website: website,
      about: about || '',
      first_name: first_name || '',
      last_name: last_name || '',
      email: user?.email || '',
    },
  });

  const createOrUpdateProfile = async (data: ProfileDataProps) => {
    try {
      setLoading(true);

      const PROFILE_DATA = {
        id: user?.id,
        first_name: first_name,
        last_name: last_name,
        website,
        about,
        email,
        avatar_url,
      };

      const { error } = await supabase
        .from('profile')
        .upsert(PROFILE_DATA, { returning: 'minimal' });

      toast.success('Settings saved! 🚀', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

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

  // if (website) {
  //   debugger;
  // }

  // const mutation = useMutation(createOrUpdateProfile, {
  //   onSuccess: () => {
  //     // toast...
  //   },
  // });

  // console.log(mutation.mutate);

  if (data) {
    return <CreateUpdateProfileForm profile={data} createOrUpdateProfile={createOrUpdateProfile} />;
  }

  // return 'loading...';

  return (
    // <form className="space-y-8 divide-y divide-gray-200" onSubmit={createOrUpdateProfile}>
    <>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            {/* {data ?? <UseForm profile={data} createOrUpdateProfile={createOrUpdateProfile} />} */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Website
              </Label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    {...register('website', { required: false })}
                    type="text"
                    // id="website"
                    // value={website || ''}
                    // autoComplete="website"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   setWebsite(e.target.value)
                    // }
                  />
                  {errors.website && <p>{errors?.website?.message}</p>}
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                About
              </Label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  {...register('about')}
                  id="about"
                  // name="about"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={about || ''}
                  // onChange={(e) => setAbout(e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            </div>

            <Avatar
              url={avatar_url}
              size={150}
              onUpload={(url: any) => {
                // setAvatarUrl(url);
                createOrUpdateProfile(url);
              }}
            />
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">placholder text for now....</p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                First name
              </Label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <Input
                  {...register('first_name')}
                  type="text"
                  // name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={first_name || ''}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  //   setFirstName(e.target.value)
                  // }
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Last name
              </Label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <Input
                  {...register('last_name')}
                  type="text"
                  id="last-name"
                  autoComplete="family-name"
                  value={last_name || ''}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email address
              </Label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <Input
                  {...register('email')}
                  id="email"
                  // name="email"
                  type="email"
                  autoComplete="email"
                  value={email || ''}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              We&apos;ll always let you know about important changes, but you pick what else you
              want to hear about.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-email">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="label-email"
                    >
                      By Email
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg space-y-4">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Comments
                          </label>
                          <p className="text-gray-500">
                            Get notified when someones posts a comment on a posting.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="candidates" className="font-medium text-gray-700">
                              Candidates
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate applies for a job.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="offers" className="font-medium text-gray-700">
                              Offers
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate accepts or rejects an offer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 sm:pt-5">
              <div role="group" aria-labelledby="label-notifications">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                  <div>
                    <div
                      className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                      id="label-notifications"
                    >
                      Push Notifications
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="max-w-lg">
                      <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit(createOrUpdateProfile)}
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
    // </form>
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
