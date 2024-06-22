import { Layout as UserLayout } from 'src/layouts/user/layout';
import Head from 'next/head';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/authSlice';
import { useRouter } from 'next/router';
import { redirectUser } from '../utils/redirect-user';
import { useEffect } from 'react';

const Page = () => {
  const title = 'Project Portal';
  const router = useRouter();

  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      router.push(redirectUser(user))
    } else {
      router.push('auth/login')
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

Page.getLayout = (page) => (
  <>
    {page}
  </>
);

export default Page;
