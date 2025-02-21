import {
  Card,
  IconButton,
  MenuItem as RootMenuItem,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import {
  ArrowUpTrayIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '../../../../utils/time';
import { styled } from '@mui/material/styles';
import { submissionActions } from './enrollment-submissions-tab';
import { useMemo } from 'react';
import useLecturer from '../../../../hooks/roles/useLecturer';
import useStudent from '../../../../hooks/roles/useStudent';

const MenuItem = styled(RootMenuItem)({
  flexGrow: 1,
  px: 2,
  py: 1
})

export default function EnrollmentSubmissionStatus(props) {
  const {state, pageDispatch, submissionData, enrollmentData} = props
  const isLecturer = useLecturer()
  const isStudent = useStudent()

  const submission = submissionData?.find(submission => submission.id === state.submissionId)

  const getSubmissionStatusColor = (status) => {
    return status === 'Submitted' && 'grey'
      || status === 'Completed' && 'warning'
      || status === 'Accepted' && 'success'
      || status === 'Rejected' && 'error'
  }
  const color = getSubmissionStatusColor(submission?.status)

  const rows = useMemo(() => (
    [
      [
        'Description',
        {
          text: submission?.description,
        }
      ],
      [
        'Status',
        {
          text: submission?.status || submission && 'Unsubmitted',
          sx: {
            ...(color && {color: `${color}.main`, backgroundColor: `${color}.light`} || {})
          }
        }
      ],
      [
        'Due Date',
        {
          text: submission && formatDate(submission?.dueDate)
        }
      ],
      [
        'Submitted Date',
        {
          text: submission && formatDate(submission?.submittedDate)
        }
      ],
      [
        'File Submission',
        {
          text: submission?.thesis?.fileNameWithExtension
        }
      ],
    ]
  ), [submission])

  return <Card
    sx={{
      p: 3,
      borderRadius: 4,
      mb: 3
    }}
  >
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography variant={'subtitle1'}>Submission Status</Typography>
      {submission && <Stack
        direction={'row'}
      >
        {(isLecturer) && <>
          <IconButton
            disabled={enrollmentData?.isPublished || !!submission.status}
            color={'error'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogSubmissionRemoveOpen,
              payload: submission
            })}
            title={'Remove submission'}
          >
            <SvgIcon><TrashIcon/></SvgIcon>
          </IconButton>
          <IconButton
            disabled={enrollmentData?.isPublished && !submission.status}
            color={'primary'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogSubmissionEditOpen,
              payload: submission
            })}
            title={'Edit submission'}
          >
            <SvgIcon><PencilIcon/></SvgIcon>
          </IconButton>
          {!enrollmentData?.isPublished && <IconButton
            disabled={submission.status !== 'Accepted' && false}
            color={'primary'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogSubmissionPublishOpen,
              payload: submission
            })}
            title={'Publish submission'}
          >
            <SvgIcon><PaperAirplaneIcon/></SvgIcon>
          </IconButton>}
          {(enrollmentData?.isPublished) && <IconButton
            color={'error'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogSubmissionUnpublishOpen,
              payload: submission
            })}
            title={'Unpublish submission'}
          >
            <SvgIcon><NoSymbolIcon/></SvgIcon>
          </IconButton>}
        </>
        }
        {isStudent && <>
          {!submission?.thesisId && <IconButton
            color={'primary'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogThesisSubmitOpen,
              payload: submission
            })}
            title={'Submit your thesis'}
          >
            <SvgIcon><ArrowUpTrayIcon/></SvgIcon>
          </IconButton>}
          {submission?.thesisId && <IconButton
            color={'error'}
            onClick={() => pageDispatch({
              type: submissionActions.onDialogThesisRemoveOpen,
              payload: submission
            })}
            title={'Remove your submission'}
          >
            <SvgIcon><TrashIcon/></SvgIcon>
          </IconButton>}
        </>}
      </Stack>}
    </Stack>
    <Stack>
      {rows.map(([left, {text, component, sx, ...props}], index) =>
        <Stack
          key={index}
          direction={'row'}
          alignItems={'center'}
          gap={1.5}
        >
          <Typography
            sx={{
              maxWidth: 120,
              width: 120
            }}
          >{left}</Typography>
          <MenuItem
            sx={{
              borderRadius: 2,
              ...sx
            }}
            {...props}
          >
            <Typography
              sx={{
                opacity: text ? 1 : 0
              }}
            >
              {text || 'Place holder text'}
            </Typography>
          </MenuItem>
        </Stack>
      )}
    </Stack>
  </Card>
}