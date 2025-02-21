import { Avatar, Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { stringAvatar, stringToColor } from '../../../utils/avatar';
import ColorizedAvatar from '../../../components/avatar';

const tabs = [
  'Submissions',
  'Overview',
  'Team Members',
  'Evaluation'
]

const enrollmentHeaderActions = {
  onTabChange: 'tab'
}

export default function EnrollmentHeader(props) {
  const {state, pageDispatch, enrollmentData, enrollmentMemberData}  = props
  const {tab} = state;

  return <Box
    sx={{
      flexGrow: 1,
      mb: 4,
    }}
  >
    <Stack
      sx={{
        gap: 1.5,
        mb: 5
      }}
    >
      <Typography variant={'h5'}>{enrollmentData?.project?.name}</Typography>
      <Stack
        sx={{
          gap: 1
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={1}
        >
          <Typography variant={'h4'}>{enrollmentData?.title}</Typography>
          <Stack
            direction={'row'}
            gap={1}
          >
            {enrollmentMemberData?.map(member => <ColorizedAvatar
              key={member.id}
              user={member}
              sx={{
                cursor: 'pointer',
                height: 32,
                width: 32,
                m: 'auto',
                fontSize: '0.875rem',
                ...(member.userId === enrollmentData?.ownerId
                  ? {
                    border: '1px solid',
                    borderColor: 'primary'
                  }
                  : {})
              }}
            />)}
          </Stack>
        </Stack>
        <Typography varaint={'caption'}>
          Froked from EIU Projects
        </Typography>
      </Stack>
    </Stack>
    <Tabs
      value={tab}
      onChange={(_, value) => pageDispatch({
        type: enrollmentHeaderActions.onTabChange,
        payload: value
      })}
      sx={(theme) => ({
        '& .MuiTabs-flexContainer': {
          alignItems: 'center'
        },
        '& .MuiTabs-indicator': {
          background: theme.palette.primary.gradient
        }
      })}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
    >
      {tabs.map((_tab, index) => (index === tab ?
        <Typography key={index} component={Typography} variant={'h4'} gradient>{_tab}</Typography> :
        <Tab key={index} label={_tab} value={index}/>))}
    </Tabs>
  </Box>
}