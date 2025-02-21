import { Layout as PortalLayout } from 'src/layouts/portal/layout';
import Head from 'next/head';
import { Box } from '@mui/material';
import ProjectOverview from '../../sections/portal/home/project-overview';
import LectureList from '../../sections/portal/home/lecturer-list';

const Page = () => {
  const title = 'Project Portal';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 8
        }}
      >
        <ProjectOverview/>
        <LectureList/>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <PortalLayout>
    {page}
  </PortalLayout>
);

export default Page;
