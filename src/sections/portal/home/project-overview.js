import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { useGetProjectOverviewQuery, useListProjectsQuery } from '../../../agent/projectApliSlice';
import { Fragment, useCallback, useMemo } from 'react';
import { reducerBuilder } from '../../../utils/reducer-builder';
import { useAsyncReducer } from '../../../hooks/use-async-reducer';
import NextLink from 'next/link';
import { useDialog } from '../../../hooks/use-dialog';
import { EDialog } from '../../../components/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '../../../components/auto-form/components/Field';
import { useListSemestersQuery } from '../../../agent/semesterApliSlice';
import NoData from '../../../components/no-data';
import { Skeleton } from '@mui/lab';
import CardSkeleton from '../../../components/cardSkeleton';
import { stringAvatar, stringToColor } from '../../../utils/avatar';
import { getProjectEnrollmentFields } from './get-project-enrollment-fields';
import { useListStudentQuery } from '../../../agent/studentApliSlice';
import { useListLecturersQuery } from '../../../agent/lecturerApliSlice';
import { useAddSchoolMutation } from '../../../agent/schoolApiSlice';
import { useAddEnrollmentMutation } from '../../../agent/enrollmentApiSlice';
import { useRouter } from 'next/router';

const DialogContent = (props) => {
  const { methods, dialogState } = props;
  return <>
    {dialogState.Component && <dialogState.Component/>}
    <Stack spacing={2}>
      {dialogState.fields?.map((field, index) => {
        return field.hidden && (_.isFunction(field.hidden) ? field.hidden?.(methods.watch()) : field.hidden === true)
          ? null
          : <Field key={index} {...field} defaultValue={dialogState.formValues[field.name]}/>;
      })}
    </Stack>
  </>;
};

export default function ProjectOverview(props) {
  const {
    data: projectOverviewData,
    isFetching: isFetchingProjectOverview,
    isLoading: isLoadingProjectOverview,
    error: projectOverviewError
  } = useGetProjectOverviewQuery();

  const {
    data: projectData,
    isFetching: isFetchingProject,
    isLoading: isLoadingProject,
    error: projectError
  } = useListProjectsQuery({page: 0, rowsPerPage: 100});

  const {
    data: semesterData,
    isFetching: isFetchingSemester,
    isLoading: isLoadingSemester,
    error: semesterError
  } = useListSemestersQuery({page: 0, rowsPerPage: 100});

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

  const [addEnrollment, { isLoading: isAddingEnrollment }] = useAddEnrollmentMutation();

  const router = useRouter();

  const dialogConfig = useDialog();

  const pageActions = {
    onEnrollmentRedirect: 'onEnrollmentRedirect',
    onDialogCancel: 'onDialogCancel',
    onDialogEnrollOpen: 'onDialogEnrollOpen',
    onDialogEnrollSubmit: 'onDialogEnrollSubmit',
  }

  const projectEnrollmentFields = getProjectEnrollmentFields({studentData: studentData?.items, lecturerData: lecturerData?.items})

  const actionHandlers = useCallback((state, action) => {
    const { type, payload, dispatch } = action;
    return [
      [pageActions.onDialogCancel, () => {
        dialogConfig.onClose();
        return state;
      }],
      [pageActions.onEnrollmentRedirect, () => {
        router.push(`/portal/enrollments/${payload}`)
        return state;
      }],
      [pageActions.onDialogEnrollOpen, () => {
        dialogConfig.onOpen();
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Enroll',
            formValues: {projectId: payload, canBeForked: false},
            submitAction: pageActions.onDialogEnrollSubmit,
            fields: projectEnrollmentFields
          }
        };
      }],
      [pageActions.onDialogEnrollSubmit, () => {
        const body = {
          projectId: payload.projectId,
          title: payload.title,
          vision: payload.vision,
          mission: payload.mission,
          canBeForked: payload.canBeForked,
          heirFortunes: payload.hairFortunes,
          emails: [...(payload.students || []), ...payload.supervisors]
        }
        addEnrollment(body).then(() => dispatch({type: pageActions.onDialogCancel}))
        return state;
      }],
    ]
  }, [projectEnrollmentFields]);

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


  const methods = useForm({
    // defaultValues: dialogState.formValues,
    values: dialogState.formValues
  });
  const defaultActions = useMemo(() => dialogConfig.getDefaultActions({
    disableSubmitting: dialogState.disableSubmitting,
    submitText: 'Submit',
    onSubmit: methods.handleSubmit((data) => pageDispatch({
      type: dialogState.submitAction,
      payload: data
    })),
    onCancel: () => pageDispatch({ type: pageActions.onDialogCancel }),
    ...dialogState.actionProps
  }), [dialogConfig, dialogState]);

  return <Box>
    <Typography variant={'h2'} sx={{mb: 5}}>
      Overview
    </Typography>
    <EDialog
      title={'Enroll'}
      titleProps={{ sx: { fontWeight: 600 } }}
      dialogProps={{...defaultActions.submitOnEnterPressed}}
      {...dialogConfig}
      renderActions={defaultActions.render}
      fullWidth
    >
      <FormProvider {...methods}>
        <DialogContent methods={methods} dialogState={dialogState}/>
      </FormProvider>
    </EDialog>
    {projectOverviewError && <NoData resourceName={'Projects'}/>}

    {isFetchingProjectOverview && <Grid container sx={{ gap: 2 }}>
      {[1, 2].map((item, index) =>
        <Grid key={index} xs={12} sm={3} lg={3}>
          <CardSkeleton/>
        </Grid>
      )}
    </Grid>}

    {projectOverviewData?.projects?.map((group, index) =>
      <Grid key={index} container sx={{gap: 2}}>
          {group?.map((item, index) => {
            const hasEnrollment = !!item.enrollment
            const hasPassed = item.enrollment?.isPublished
            const project = projectData?.items.find(project => project.id === item.id)
            const semester = semesterData?.items.find(semester => semester.id === item.enrollment?.semesterId)

            return <Grid key={index} xs={12} sm={3} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  ...(hasEnrollment ? {
                    cursor: 'pointer'
                  } : {})
                }}
                {...(hasEnrollment ? {
                  onClick: () => {pageDispatch({type: pageActions.onEnrollmentRedirect, payload: item.enrollment.id})}
                } : {})}
              >
                <CardContent sx={{p: 0}}>
                  <Box
                    sx={{
                      height: 150,
                      backgroundColor: stringToColor(stringAvatar(project?.name || '') + 'dslkfsj'),
                    }}
                  />
                  <Stack sx={{p: 2, gap: 1, textAlign: 'center', alignItems: 'center', pb: 0, mb: '44px'}}>
                    <Typography
                      variant={'h6'}
                      {...(hasPassed ? {
                        color: 'success.dark'
                      } : item.registrable ? {
                        color: 'primary.dark'
                      } : {})}
                    >
                      {project?.name || item.id}
                    </Typography>
                    {hasEnrollment &&
                      <Typography>
                        {hasPassed ? 'Completed' : 'Enrolled'}{semester?.name ? ` on ${semester.name}` : ''}
                      </Typography>
                    }
                  </Stack>
                  {item.registrable &&
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        p: 2
                      }}
                    >
                      <Button
                        variant={'outlined'}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          pageDispatch({type: pageActions.onDialogEnrollOpen, payload: item.id})
                        }}
                        sx={{
                          width: 'fit-content',
                          display: 'block',
                          margin: 'auto'
                        }}
                      >
                        Enroll
                      </Button>
                    </Box>
                  }
                </CardContent>
              </Card>
            </Grid>
          })}
      </Grid>
    )}

  </Box>
}