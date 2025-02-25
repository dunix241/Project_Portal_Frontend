import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Stack, useMediaQuery } from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { SideNavItem } from './side-nav-item';

export const SideNav = (props) => {
  const { open, onClose, items } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Divider/>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp && open) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'common.white',
            color: 'neutral.800',
            width: 280,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .12)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'common.white',
          color: 'neutral.800',
          width: 280,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .12)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
        }
      }}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'transparent'
          }
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
