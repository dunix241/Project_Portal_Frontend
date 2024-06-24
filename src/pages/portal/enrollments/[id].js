import { Layout as PortalLayout } from 'src/layouts/portal/layout';
import Head from 'next/head';
import { useCallback, useEffect, useMemo } from 'react';
import { reducerBuilder } from '../../../utils/reducer-builder';
import { useAsyncReducer } from '../../../hooks/use-async-reducer';
import { useRouter } from 'next/router';
import { useDialog } from '../../../hooks/use-dialog';
import { Box, Stack, Typography } from '@mui/material';
import EnrollmentSideBar from '../../../sections/portal/enrollments/enrollment-side-bar';
import EnrollmentHeader from '../../../sections/portal/enrollments/enrollment-header';
import {
  useGetEnrollmentHistoryQuery,
  useGetEnrollmentQuery,
  useUpdateEnrollmentMutation
} from '../../../agent/enrollmentApiSlice';
import {
  useAddEnrollmentMemberMutation,
  useListEnrollmentMembersQuery,
  useRemoveEnrollmentMemberMutation
} from '../../../agent/enrollmentMemberApiSlice';
import EnrollmentSubmissionsTab, { submissionActions } from '../../../sections/portal/enrollments/submission/enrollment-submissions-tab';
import {
  useAddSubmissionCommentMutation,
  useLazyListSubmissionCommentsQuery
} from '../../../agent/commentApiSlice';
import EnrollmentTeamMemberTab, { teamMemberActions } from '../../../sections/portal/enrollments/team-member/enrollment-team-member-tab';
import {
  useAddSubmissionMutation,
  useListSubmissionsQuery,
  usePublishMutation,
  useRemoveSubmissionMutation, useSubmitMutation,
  useUnpublishMutation, useUnSubmitMutation,
  useUpdateSubmissionMutation
} from '../../../agent/submissionApiSlice';
import { commentActions } from '../../../sections/portal/enrollments/submission/enrollment-submission-comment';
import { EDialog } from '../../../components/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import Autoform from '../../../components/auto-form/components/Autoform';
import { getEnrollmentSubmissionAddEditFields } from '../../../sections/portal/enrollments/submission/fields/enrollment-submission-add-edit-fields';
import dayjs from 'dayjs';
import RemoveWarning, { getDangerActionProps } from '../../../components/remove-warning';
import { useListStudentQuery } from '../../../agent/studentApliSlice';
import { useListLecturersQuery } from '../../../agent/lecturerApliSlice';
import { getEnrollmentTeamMemberAddEditFields } from '../../../sections/portal/enrollments/team-member/enrollment-team-member-add-edit-fields';
import EnrollmentOverviewTab, { overviewActions } from '../../../sections/portal/enrollments/overview/enrollment-overview-tab';
import { submitThesisFields } from '../../../sections/portal/enrollments/submission/fields/submit-thesis-fields';

const Page = () => {
  const router = useRouter()

  const {id} = router.query;

  const {
    data: enrollmentData,
    isFetching: isFetchingEnrollment,
    isLoading: isLoadingEnrollment,
    error: enrollmentError
  } = useGetEnrollmentQuery({id});

  const title = enrollmentData?.title || 'Enrollment';

  const {
    data: enrollmentHistoryData,
    isFetching: isFetchingEnrollmentHistory,
    isLoading: isLoadingEnrollmentHistory,
    error: enrollmentHistoryError
  } = useGetEnrollmentHistoryQuery({enrollmentId: id});

  const {
      data: enrollmentMemberData,
      isFetching: isFetchingEnrollmentMember,
      isLoading: isLoadingEnrollmentMember,
      error: enrollmentMemberError
    } = useListEnrollmentMembersQuery({enrollmentId: id});

  const {
    data: submissionData,
    isFetching: isFetchingSubmission,
    isLoading: isLoadingSubmission,
    error: submissionError
  } = useListSubmissionsQuery({enrollmentId: id});

  const [updateEnrollment, {isLoading: isUpdatingEnrollment}] = useUpdateEnrollmentMutation()
  const [addSubmission, {isLoading: isAddingSubmission}] = useAddSubmissionMutation()
  const [updateSubmission, {isLoading: isUpdatingSubmission}] = useUpdateSubmissionMutation()
  const [removeSubmission, {isLoading: isRemovingSubmission}] = useRemoveSubmissionMutation()
  const [publishSubmission, {isLoading: isPublishingSubmission}] = usePublishMutation()
  const [unpublishSubmission, {isLoading: isUnpublishingSubmission}] = useUnpublishMutation()
  const [submitThesis, {isLoading: isSubmittingThesis}] = useSubmitMutation()
  const [unSubmitThesis, {isLoading: isUnSubmittingThesis}] = useUnSubmitMutation()
  const [addEnrollmentMember, {isLoading: isAddingEnrollmentMember}] = useAddEnrollmentMemberMutation()
  const [removeEnrollmentMember, {isLoading: isRemovingEnrollmentMember}] = useRemoveEnrollmentMemberMutation()

  const {
    data: studentData,
    isFetching: isFetchingStudent,
    isLoading: isLoadingStudent,
    error: studentError
  } = useListStudentQuery({page: 0, rowsPerPage: 100});

  const {
    data: lecturerData,
    isFetching: isFetchingLecturer,
    isLoading: isLoadingLecturer,
    error: lecturerError
  } = useListLecturersQuery({page: 0, rowsPerPage: 100});

  const [
    listSubmissionComments,
    {
      data: submissionCommentData,
      isFetching: isFetchingSubmissionComment,
      isLoading: isLoadingSubmissionComment,
      error: submissionCommentError
    }
  ] = useLazyListSubmissionCommentsQuery();

  const [addComment, {isLoading: isAddingComment}] = useAddSubmissionCommentMutation();

  const pageActions = {
    onDialogCancel: 'onDialogCancel'
  }

  const dialogConfig = useDialog()
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

  const enrollmentTeamMemberAddEditFields = getEnrollmentTeamMemberAddEditFields({studentData: studentData?.items, lecturerData: lecturerData?.items})
  const enrollmentSubmissionAddEditFields = getEnrollmentSubmissionAddEditFields({submissionData: submissionData})
  const actionHandlers = useCallback((state, action) => {
    const { type, payload, dispatch } = action;
    return [
      [
        /onDialog.*Open/g.test(type),
        () => {
          dialogConfig.onOpen();
        },
        { isVoid: true }
      ],
      [pageActions.onDialogCancel, () => {
        dialogConfig.onClose();
        return {...state, dialogState: {...initialDialogState}};
      }],
      ['submissionId', () => {
        if (payload) {
          listSubmissionComments({submissionId: payload})
        }
        return {...state, submissionId: payload}
      }],
      [commentActions.onCommentPost, () => {
        addComment({content: state.comment, submissionId: state.submissionId}).then(() => listSubmissionComments({submissionId: state.submissionId}))
        return {...state, comment: null}
      }],
      [
        submissionActions.onDialogSubmissionAddOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Add a Submission',
            formValues: {dueDate: null},
            submitAction: submissionActions.onDialogSubmissionAddSubmit,
            fields: enrollmentSubmissionAddEditFields
          }
        };
      }
      ],
      [submissionActions.onDialogSubmissionAddSubmit, () => {
        addSubmission({enrollmentId: id, ...payload}).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state
      }],
      [
        submissionActions.onDialogSubmissionEditOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Edit Submission',
            formValues: {id: payload.id, dueDate: payload.dueDate && dayjs(payload.dueDate) || null, description: payload.description, status: payload.status},
            submitAction: submissionActions.onDialogSubmissionEditSubmit,
            fields: enrollmentSubmissionAddEditFields
          }
        };
      }
      ],
      [submissionActions.onDialogSubmissionEditSubmit, () => {
        updateSubmission(payload).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state
      }],
      [
        submissionActions.onDialogSubmissionRemoveOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Remove Submission',
            data: payload,
            Component: () => <RemoveWarning resourceName={'Submission'}/>,
            submitAction: submissionActions.onDialogSubmissionRemoveSubmit,
            actionProps: getDangerActionProps(),
          }
        };
      }
      ],
      [submissionActions.onDialogSubmissionRemoveSubmit, () => {
        removeSubmission(state.dialogState.data).then(() => dispatch({type: pageActions.onDialogCancel}))
        return {...state, submissionId: null}
      }],
      [
        submissionActions.onDialogSubmissionPublishOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Publish Submission',
            data: payload,
            Component: () => <Typography>Are you sure you want to publish this submission?</Typography>,
            submitAction: submissionActions.onDialogSubmissionPublishSubmit,
            actionProps: {
              submitText: 'Publish'
            }
          }
        };
      }
      ],
      [submissionActions.onDialogSubmissionPublishSubmit, () => {
        publishSubmission({id: state.dialogState.data.id}).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }],
      [
        submissionActions.onDialogSubmissionUnpublishOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Unpublish Submission',
            data: payload,
            Component: () => <Typography>Are you sure you want to unpublish this submission?</Typography>,
            submitAction: submissionActions.onDialogSubmissionUnpublishSubmit,
            actionProps: getDangerActionProps({submitText: 'Unpublish'}),
            fields: []
          }
        };
      }
      ],
      [submissionActions.onDialogSubmissionUnpublishSubmit, () => {
        unpublishSubmission(state.dialogState.data).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }],
      [overviewActions.onOverviewUpdate, () => {
        updateEnrollment({id: id, ...payload})
        return state;
      }],
      [
        teamMemberActions.onDialogInviteOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Invite',
            formValues: {},
            submitAction: teamMemberActions.onDialogInviteSubmit,
            fields: enrollmentTeamMemberAddEditFields
          }
        };
      }
      ],
      [
        teamMemberActions.onDialogInviteSubmit, () => {
          const emails = [...(payload.students || []), ...(payload.lecturers || [])]
          Promise.all(emails.map((email) => addEnrollmentMember({id, email: email}))).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }
      ],
      [
        teamMemberActions.onDialogRemoveEnrollmentMemberOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Recall Invitation',
            submitAction: teamMemberActions.onDialogRemoveEnrollmentMemberSubmit,
            data: payload,
            Component: () => <RemoveWarning text={'Are you sure you want to recall your invitation to'} name={payload.fullName}/>,
            actionProps: getDangerActionProps(),
          }
        };
      }
      ],
      [
        teamMemberActions.onDialogRemoveEnrollmentMemberSubmit, () => {
          removeEnrollmentMember({id: state.dialogState.data.id}).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }
      ],
      [
        submissionActions.onDialogThesisSubmitOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Submit',
            formValues: {},
            data: payload,
            submitAction: submissionActions.onDialogThesisSubmitSubmit,
            fields: submitThesisFields
          }
        };
      }
      ],
      [
        submissionActions.onDialogThesisSubmitSubmit, () => {
          const formData = new FormData();

          const file = payload.file?.at(0)?.file
          console.log(file)
          formData.append('file', file)
          console.log(state.dialogState.data)

          submitThesis({id: state.dialogState.data?.id, formData}).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }
      ],
      [
        submissionActions.onDialogThesisRemoveOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Remove your submission',
            submitAction: submissionActions.onDialogThesisRemoveSubmit,
            data: payload,
            Component: () => <RemoveWarning resourceName={'submission?'}/>,
            actionProps: getDangerActionProps(),
          }
        };
      }
      ],
      [
        submissionActions.onDialogThesisRemoveSubmit, () => {
          unSubmitThesis({id: state.dialogState.data.id}).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }
      ],
    ]
  }, [enrollmentTeamMemberAddEditFields]);

  const reducer = useMemo(() => reducerBuilder(actionHandlers), [actionHandlers]);
  const initialState = useMemo(() => ({
    tab: 0,
    dialogState: initialDialogState,
  }), [])
  const asyncReducer = useMemo(() => ({}), [])
  const [state, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);
  const {dialogState} = state;

  console.log(state)

  useEffect(() => {
    if (submissionData) {
      if (!state.submissionId) {
        pageDispatch({type: 'submissionId', payload: submissionData?.at(0)?.id})
      }
    }
  }, [submissionData]);

  const methods = useForm({
    // defaultValues: dialogState.formValues,
    values: dialogState.formValues
  });

  useEffect(() => {
    methods.reset();
  }, [dialogState]);

  const defaultActions = useMemo(() => dialogConfig.getDefaultActions({
    disableSubmitting: dialogState.disableSubmitting,
    onSubmit: methods.handleSubmit((data) => pageDispatch({
      type: dialogState.submitAction,
      payload: data
    })),
    onCancel: () => pageDispatch({ type: pageActions.onDialogCancel }),
    ...dialogState.actionProps
  }), [dialogConfig, dialogState]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Stack
        component="main"
        direction={'row'}
        sx={{
          py: 8,
          gap: 4,
          maxWidth: '100vw'
        }}
      >
        <EnrollmentSideBar
          state={state}
          pageDispatch={pageDispatch}
          enrollmentHistoryData={enrollmentHistoryData}
          enrollmentData={enrollmentData}
        />
        <Box
          flexGrow={1}
          sx={{
            maxWidth: '100%'
          }}
        >
          <EnrollmentHeader
            state={state}
            pageDispatch={pageDispatch}
            enrollmentData={enrollmentData}
            enrollmentMemberData={enrollmentMemberData?.enrollmentMembers}
          />
          <EnrollmentSubmissionsTab
            state={state}
            pageDispatch={pageDispatch}
            enrollmentData={enrollmentData}
            enrollmentMemberData={enrollmentMemberData?.enrollmentMembers}
            submissionData={submissionData}
            submissionCommentData={submissionCommentData?.items}
          />
          <EnrollmentOverviewTab
            state={state}
            pageDispatch={pageDispatch}
            enrollmentData={enrollmentData}
          />
          <EnrollmentTeamMemberTab
            state={state}
            pageDispatch={pageDispatch}
            enrollmentData={enrollmentData}
            enrollmentMemberData={enrollmentMemberData?.enrollmentMembers}
          />
        </Box>
        <EDialog
          title={dialogState.title}
          titleProps={{ sx: { fontWeight: 600 } }}
          dialogProps={{...defaultActions.submitOnEnterPressed}}
          {...dialogConfig}
          renderActions={defaultActions.render}
          fullWidth
        >
          <FormProvider {...methods}>
            <Autoform methods={methods} formState={dialogState}/>
          </FormProvider>
        </EDialog>
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
