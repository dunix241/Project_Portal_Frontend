import {
  Box,
  Card,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import ColorizedAvatar from '../../../../components/avatar';
import { XMarkIcon } from '@heroicons/react/24/solid';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentUser } from '../../../../store/authSlice';

export const teamMemberActions = {
  onDialogInviteOpen: 'onDialogInviteOpen',
  onDialogInviteSubmit: 'onDialogInviteSubmit',
  onDialogRemoveEnrollmentMemberOpen: 'onDialogRemoveEnrollmentMemberOpen',
  onDialogRemoveEnrollmentMemberSubmit: 'onDialogRemoveEnrollmentMemberSubmit',
}

export default function EnrollmentTeamMemberTab(props) {
  const {state, pageDispatch, enrollmentData, enrollmentMemberData} = props

  const user = useAppSelector(selectCurrentUser);
  console.log(user)
  console.log(enrollmentData);

  return state.tab === 2
    ? <Box>
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          mt: 3
        }}
        component={MenuList}
      >
        {enrollmentMemberData?.map((member, index) =>
          <>
            <MenuItem
              key={index}
              sx={(theme) => ({
                borderRadius: 2,
                py: 1,
                justifyContent: 'space-between',
                flexDirection: {
                  sm: 'row',
                  xs: 'column'
                }
              })}
            >
              <Stack
                // direction={'row'}
                gap={2}
                alignItems={'center'}
                sx={{
                  flexDirection: {
                    sm: 'row',
                    xs: 'column'
                  }
                }}
              >
                <ColorizedAvatar
                  user={member}
                  sx={{
                    width: 40,
                    height: 40
                  }}
                />
                <Box>
                  <Typography>{member.fullName}</Typography>
                  <Typography>{member.email}</Typography>
                </Box>
              </Stack>
              {(member.isAccepted === null || member.isAccepted === undefined) &&
                <Stack
                  gap={5}
                  alignItems={'center'}
                  sx={{
                    flexDirection: {
                      sm: 'row',
                      xs: 'column'
                    }
                  }}
                >
                <Typography color={'success.dark'}>Pending Invitation</Typography>
                  {user?.id === enrollmentData?.ownerId && <IconButton
                  sx={{
                    border: 1,
                    borderRadius: '50%',
                    color: 'error.dark',
                    width: 30,
                    height: 30
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    pageDispatch({type: teamMemberActions.onDialogRemoveEnrollmentMemberOpen, payload: member})
                  }}
                ><SvgIcon><XMarkIcon/></SvgIcon></IconButton>}
              </Stack>}
              {member.isAccepted === false && <Typography color={'error.main'}>Rejected</Typography>}
            </MenuItem>
            <Divider/>
          </>
        )}
        <MenuItem
          sx={(theme) => ({
            borderRadius: 2,
            py: 1,
            gap: 2
          })}
          onClick={e => pageDispatch({type: teamMemberActions.onDialogInviteOpen})}
        >
          <SvgIcon><PlusIcon/></SvgIcon> Invite
        </MenuItem>
      </Card>
    </Box>
    : null
}