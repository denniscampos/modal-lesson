import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainLayout } from '@/layout/MainLayout';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session as null);

      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated');
      }

      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated');
      }

      checkUser();

      return () => {
        authListener?.unsubscribe();
      };
    });
  }, []);

  async function handleAuthChange(event: string, session: null) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState('authenticated');
    }
  }

  const loginOrRegisterPage =
    router.pathname === '/login' || router.pathname === '/register' ? false : true;

  return (
    <ApolloProvider client={client}>
      {loginOrRegisterPage && <Navbar auth={authenticatedState} />}
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
