import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainLayout } from '@/layout/MainLayout';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const router = useRouter();

  const loginOrRegisterPage =
    router.pathname === '/login' || router.pathname === '/register' ? false : true;

  return (
    <ApolloProvider client={client}>
      {loginOrRegisterPage && <Navbar />}
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
