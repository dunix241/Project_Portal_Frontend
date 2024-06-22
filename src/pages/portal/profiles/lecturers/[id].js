import { Layout as PortalLayout } from 'src/layouts/portal/layout';
import Head from 'next/head';
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { reducerBuilder } from '../../../../utils/reducer-builder';
import { useAsyncReducer } from '../../../../hooks/use-async-reducer';
import { useGetLecturerQuery } from '../../../../agent/lecturerApliSlice';
import { useRouter } from 'next/router';
import { useDialog } from '../../../../hooks/use-dialog';
import { stringAvatar, stringToColor } from '../../../../utils/avatar';
import { useListSemestersQuery } from '../../../../agent/semesterApliSlice';
import {
  useGetSchoolQuery,
  useLazyGetSchoolQuery,
  useListSchoolsQuery
} from '../../../../agent/schoolApiSlice';
import { editorConfig } from '../../../../components/editor';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import LecturerIntroduction
  from '../../../../sections/portal/profiles/lecturers/lecturer-introduction';

const Page = () => {
  const title = 'Lecturer Profile';
  const router = useRouter()

  const {id} = router.query;

  const {
    data: lecturerData,
    isFetching: isFetchingLecturer,
    isLoading: isLoadingLecturer,
    error: lecturerError
  } = useGetLecturerQuery({id});

  const [getSchool, {
    data: schoolData,
    isFetching: isFetchingSchool,
    isLoading: isLoadingSchool,
    error: schoolError
  }] = useLazyGetSchoolQuery({id: lecturerData?.schoolId});

  useEffect(() => {
    if (lecturerData?.schoolId) {
      getSchool({id: lecturerData.schoolId})
    }
  }, [lecturerData]);

  const pageActions = {
    onEnrollmentRedirect: 'onEnrollmentRedirect',
    onDialogCancel: 'onDialogCancel',
    onDialogEnrollOpen: 'onDialogEnrollOpen',
    onDialogEnrollSubmit: 'onDialogEnrollSubmit',
  }

  const dialogConfig = useDialog()
  const actionHandlers = useCallback((state, action) => {
    const { type, payload, dispatch } = action;
    return [
      [pageActions.onDialogCancel, () => {
        dialogConfig.onClose();
        return state;
      }],
    ]
  }, []);

  const reducer = useMemo(() => reducerBuilder(actionHandlers), [actionHandlers]);
  const initialDialogState = useMemo(
    () => (
      {
        title: '',
        disableSubmitting: false,
        submitAction: '',
        formValues: {},
        fields: [],
        Component: null
      }), []);
  const initialState = useMemo(() => ({
    dialogState: initialDialogState
  }), [])
  const asyncReducer = useMemo(() => ({}), [])
  const [{dialogState}, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Stack
        component="main"
        sx={{
          py: 8,
          gap: 4
        }}
      >
        <LecturerIntroduction
          schoolData={schoolData}
          lecturerData={lecturerData}
        />
        <Paper
          sx={{
            p: 3,
            borderRadius :4
          }}
        >
          <Typography variant={'h6'}>
            About
          </Typography>
          {lecturerData?.description && <LexicalComposer initialConfig={{...editorConfig, readOnly: true, editorState: lecturerData.description, editable: false}}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable />
              }
            />
          </LexicalComposer>}
          {!lecturerData?.description && <Typography>There isn't a description.</Typography>}
        </Paper>
      </Stack>
    </>
  );
};

Page.getLayout = (page) => (
  <PortalLayout>
    {page}
  </PortalLayout>
);

export default Page;
