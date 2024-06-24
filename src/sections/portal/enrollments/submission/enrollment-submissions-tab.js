import { Box, MenuItem, MenuList, Stack, SvgIcon, Typography } from '@mui/material';
import { formatDate } from '../../../../utils/time';
import EnrollmentSubmissionStatus from './enrollment-submission-status';
import EnrollmentSubmissionComment from './enrollment-submission-comment';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

export const submissionActions = {
  onDialogSubmissionAddOpen: 'onDialogSubmissionAddOpen',
  onDialogSubmissionAddSubmit: 'onDialogSubmissionAddSubmit',
  onDialogSubmissionEditOpen: 'onDialogSubmissionEditOpen',
  onDialogSubmissionEditSubmit: 'onDialogSubmissionEditSubmit',
  onDialogSubmissionRemoveOpen: 'onDialogSubmissionRemoveOpen',
  onDialogSubmissionRemoveSubmit: 'onDialogSubmissionRemoveSubmit',
  onDialogSubmissionPublishOpen: 'onDialogSubmissionPublishOpen',
  onDialogSubmissionPublishSubmit: 'onDialogSubmissionPublishSubmit',
  onDialogSubmissionUnpublishOpen: 'onDialogSubmissionUnpublishOpen',
  onDialogSubmissionUnpublishSubmit: 'onDialogSubmissionUnpublishSubmit',
  onDialogThesisSubmitOpen: 'onDialogThesisSubmitOpen',
  onDialogThesisSubmitSubmit: 'onDialogThesisSubmitSubmit',
  onDialogThesisRemoveOpen: 'onDialogThesisRemoveOpen',
  onDialogThesisRemoveSubmit: 'onDialogThesisRemoveSubmit',
}

export default function EnrollmentSubmissionsTab(props) {
  const {state, pageDispatch, submissionData} = props
  const {tab} = state;

  return tab === 0 &&
  <Stack
    gap={1.75}
    sx={{
      flexDirection: {
        xs: 'column',
        sm: 'row'
      }
    }}
  >
    <Box>
      <Typography variant={'h6'} sx={{mb: 1.75}}>Submissions</Typography>
      <MenuList
        component={Stack}
        sx={{
          gap: 1.5
        }}
      >
        <MenuItem
          onClick={() => pageDispatch({type: submissionActions.onDialogSubmissionAddOpen})}
          sx={{
            borderRadius: 2,
            justifyContent: 'center',
            gap: 1,
            backgroundColor: 'primary.main',
            color: 'white'
          }}
        >
          <SvgIcon>
            <PlusIcon/>
          </SvgIcon>
          <Typography>Add</Typography>
        </MenuItem>
        {submissionData?.map((submission, index) =>
          <MenuItem
            key={index}
            onClick={() => {
              submission.id !== state.submissionId && pageDispatch({type: 'submissionId', payload: submission.id})
            }}
            sx={{
              borderRadius: 2,
              gap: 1,
              ...(submission.id === state.submissionId ? {
                color: 'primary.main',
                backgroundColor: 'primary.lighter',
              } : {})
            }}
          >
            {submission.submittedDate ? formatDate(submission.submittedDate): 'Unsubmitted'}
          </MenuItem>)}
      </MenuList>
    </Box>
    <Box flexGrow={1}>
      <EnrollmentSubmissionStatus {...props}/>
      <EnrollmentSubmissionComment {...props}/>
    </Box>
  </Stack>
  || null
}