import { stringAvatar, stringToColor } from '../utils/avatar';
import { Avatar } from '@mui/material';
import { forwardRef } from 'react';

const ColorizedAvatar = forwardRef((props, ref) => {
  const {user, name, sx, ...other} = props
  return <Avatar
    ref={ref}
    sx={{
      ...sx,
      bgcolor: stringToColor(user?.fullName || name || '')
    }}
    {...other}
  >
    {stringAvatar(user?.fullName || name || '')}
  </Avatar>
})

export default ColorizedAvatar