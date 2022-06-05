/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { supabase } from '@/lib/supabaseClient';
import Heading from '@/components/common/Heading';
import Label from '@/components/common/Label';
import SocialMediaIcon from '@/components/SocialMediaIcon';
import { schema } from '../validation/schemaResolver';
interface DataProps {
  email: string;
  password: string;
}

const Register = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<DataProps>({
    // mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const createNewUser = async (data: DataProps) => {
    // in production need to enable email confirmations through supabase settings
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      router.push('/login');

      if (error) {
        alert(error);
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <Heading variant="h2" className="text-center font-bold mt-3">
            Welcome to Modal Lesson!
          </Heading>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(createNewUser)}>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <input
                    id="email"
                    autoComplete="email"
                    required
                    {...register('email', { required: true })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors?.email && <p className="text-red-500">{errors?.email?.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="mt-1">
                  <input
                    id="password"
                    // name="password"
                    type="password"
                    {...register('password', { required: true })}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors?.password && <p className="text-red-500">{errors?.password.message}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/login">
                    <a className="font-medium text-primary hover:text-indigo-500">
                      Already have an account?
                    </a>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'loading...' : 'Sign Up'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <SocialMediaIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
