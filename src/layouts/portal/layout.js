import { memo, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { TopNav } from './top-nav';
import { withPortalGuard } from '../../hocs/with-portal-guard';
import { SideNav } from '../shared-components/side-nav';
import { useMediaQuery } from '@mui/material';
import { navItems } from './config';


const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingInline: '96px'
  },
  paddingInline: '24px'
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = memo(withAuthGuard(withPortalGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={lgUp ? false : openNav}
        items={navItems}
      />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
})));
