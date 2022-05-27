import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MainLayout } from '@/layout/MainLayout';
import { Sidebar } from '@/components/Sidebar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const router = useRouter();

  const loginPage = router.pathname === '/login' ? false : true;

  return (
    <MainLayout>
      {loginPage && <Sidebar />}
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
