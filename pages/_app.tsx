import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainLayout } from '@/layout/MainLayout';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';
// import { Sidebar } from '@/components/Sidebar';
// import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  // const router = useRouter();

  // const loginPage = router.pathname === '/login' ? false : true;

  return (
    <ApolloProvider client={client}>
      <MainLayout>
        {/* {loginPage} */}
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
