import { Box, MenuItem, MenuList, Stack, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

export default function EnrollmentSideBar(props) {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const {enrollmentHistoryData, enrollmentData} = props
  const router = useRouter()
  const {id} = router.query

  return lgUp
    ? <Stack
      sx={{
        width: 260,
        gap: 3,
        marginTop: '75px'
      }}
    >
      <Stack
        sx={{
          gap: 1.5
        }}
      >
        <Box>
          <Typography variant={'h6'} sx={{mb: 1.75}}>Enrollments</Typography>
          {enrollmentHistoryData && <MenuList>
            {enrollmentHistoryData?.map((semester, index) =>
              <MenuItem
                key={index}
                onClick={() => router.push(`/portal/enrollments/${semester.enrollmentId}`)}
                sx={{
                  borderRadius: 2,
                  ...(enrollmentData?.semester?.id === semester.semesterId ? {color: 'primary.main', backgroundColor: 'primary.lighter'} : {})
                }}
              >
                {semester.name}
              </MenuItem>)}
          </MenuList>}
        </Box>
      </Stack>

    </Stack>
    : null
}