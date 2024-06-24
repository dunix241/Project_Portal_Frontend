import { Box, Button, Card, Stack, Typography } from '@mui/material';
import ColorizedAvatar from '../../../../components/avatar';
import { formatDate, formatDateTime } from '../../../../utils/time';
import { Editor, EditorBody, editorConfig } from '../../../../components/editor';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentUser } from '../../../../store/authSlice';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import SubmitPlugin from '../../../../components/editor/plugins/SubmitPlugin';

export const commentActions = {
  onCommentPost: 'onCommentPost:'
}

export default function EnrollmentSubmissionComment(props) {
  const {state, pageDispatch, submissionCommentData, enrollmentMemberData} = props
  const user = useAppSelector(selectCurrentUser);
  console.log(submissionCommentData)

  return <Card
    sx={{
      p: 3,
      borderRadius: 4,
    }}
  >
    <Stack
      gap={2}
    >
      <Typography variant={'subtitle1'}>Comments</Typography>
      <Stack
        gap={1}
        sx={{
          height: 200,
          overflow: 'auto'
        }}
      >
        {submissionCommentData?.map((comment, index) => {
          const user = enrollmentMemberData?.find(member => member.userId === comment.userId)
          return <Stack
            key={index}
            direction={'row'}
            gap={1.75}
            alignItems={'center'}
          >
            <ColorizedAvatar
              user={user}
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.875rem'
              }}
            />
            <Box>
              <Stack
                direction={'row'}
                gap={1}
                alignItems={'center'}
                sx={{
                  overflow: 'auto',
                }}
              >
                <Typography variant={'caption'} fontWeight={'bold'}>
                  {user?.fullName}
                </Typography>
                <Typography>{formatDateTime(comment?.date, true)}</Typography>
              </Stack>
              {/* <Typography>{comment.content}</Typography> */}
              <Editor
                value={comment.content}
                readOnly
              />
            </Box>
          </Stack>
        })}
      </Stack>
      <LexicalComposer initialConfig={{...editorConfig, editorState: state.comment}}>
        <EditorBody
          onChange={(value) => pageDispatch({type: 'comment', payload: value})}
        />
        <SubmitPlugin
          variant={'contained'}
          disabled={!state.comment}
          sx={{
            width: 'fit-content'
          }}
          onSubmit={() => pageDispatch({type: commentActions.onCommentPost})}
        >
          Post
        </SubmitPlugin>
      </LexicalComposer>
      <Stack
        direction={'row'}
        alignItems={'center'}
        gap={1}
      >
        <Typography>Comment as {user?.fullName}</Typography>
        <ColorizedAvatar
          user={user}
          sx={{
            width: 32,
            height: 32
          }}
        />
      </Stack>
    </Stack>
  </Card>
}