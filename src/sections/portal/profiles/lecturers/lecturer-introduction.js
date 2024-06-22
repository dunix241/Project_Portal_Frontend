import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { stringAvatar, stringToColor } from '../../../../utils/avatar';

export default function LecturerIntroduction(props) {
  const {lecturerData, schoolData} = props
  return <Paper
    sx={{
      borderRadius: 4
    }}
  >
    <Box
      sx={{
        height: 200,
        bgcolor: stringToColor(`${lecturerData?.fullName || ''}ddljk`),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      }}
    />
    <Stack
      sx={{
        p: 3,
        gap: 1,
        mt: '-112px'
      }}
    >
      <Avatar
        sx={{
          cursor: 'pointer',
          height: 160,
          width: 160,
          bgcolor: stringToColor(lecturerData?.fullName || 'sdlk'),
          border: '1px solid white'
        }}
      >
        {stringAvatar(lecturerData?.fullName || '')}
      </Avatar>
      <Stack
        sx={{
          gap: 1
        }}
      >
        <Typography textAlign={'center'} variant={'subtitle1'}>
          {schoolData?.school.name}
        </Typography>
        <Box>
          <Typography variant={'h6'}>
            {lecturerData?.title} {lecturerData?.name}
          </Typography>
          <Typography variant={'body2'}>
            {lecturerData?.headline}
          </Typography>
        </Box>
        <Typography
          variant={'caption'}
          sx={{
            cursor: 'pointer'
          }}
          color={'primary'}
        >
          Contact Info
        </Typography>
      </Stack>
    </Stack>
  </Paper>
}