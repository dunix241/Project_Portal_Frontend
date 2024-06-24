import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectCurrentUser } from '../../store/authSlice';
import { stringAvatar, stringToColor } from '../../utils/avatar';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { AccountPopover } from '../shared-components/account-popover';
import { Logo } from '../../components/logo';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import NextLink from 'next/link';
import { navItems } from './config';
import ColorizedAvatar from '../../components/avatar';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = useCallback(
    () => {
      accountPopover.handleClose?.();
      dispatch(logout());
      router.push('/auth/login')
    },
    [accountPopover.handleClose]
  );

  return (
    <>
      <Box
        component="header"
        sx={{
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.12)',
          background: '#FBC02D',
          backdropFilter: 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 6.5
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            {/* <Tooltip title="Search"> */}
            {/*   <IconButton> */}
            {/*     <SvgIcon fontSize="small"> */}
            {/*       <MagnifyingGlassIcon /> */}
            {/*     </SvgIcon> */}
            {/*   </IconButton> */}
            {/* </Tooltip> */}
            {lgUp && <Logo sx={{height: 40}}/>}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <ChatBubbleOvalLeftIcon/>
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <ColorizedAvatar
              user={user}
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        items={[
          {
            onClick: () => router.push('/user/profile'),
            children: <>Profile</>
          },
          {
            onClick: handleSignOut,
            children: <>Sign out</>
          }
        ]}
      />
      {lgUp && <Paper>
        <MenuList sx={{display: 'flex', px: 6.5, py: 0}}>
          {navItems.map((item, index) => <MenuItem key={index} sx={{gap: 1.5, py: 1.5}} component={NextLink} href={item.path}>
            {item.icon}
            <Typography>{item.title}</Typography>
          </MenuItem>)}
        </MenuList>
      </Paper>}
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
