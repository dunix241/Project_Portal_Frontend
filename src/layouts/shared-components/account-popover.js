import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { selectCurrentUser } from '../../store/authSlice';
import { useAppSelector } from '../../store/hooks';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, items } = props;
  const user = useAppSelector(selectCurrentUser);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            width: 200,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .12)',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
            borderRadius: '16px',
          }
        }
      }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.fullName} ({user?.email})
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        {items.map((item, index) => <MenuItem key={index} {...item}/>)}
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
