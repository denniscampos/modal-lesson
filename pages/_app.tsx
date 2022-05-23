import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apolloClient';
import { SessionProvider } from 'next-auth/react';
import { MainLayout } from '@/layout/MainLayout';
import { Sidebar } from '@/components/Sidebar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <MainLayout>
          <Sidebar />
          <Component {...pageProps} />
        </MainLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
