import { memo, useCallback, useEffect, useMemo } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { useTable } from '../../hooks/table/use-table';
import { EDialog } from '../../components/dialog';
import { useDialog } from '../../hooks/use-dialog';
import {
  useAddLecturerMutation,
  useLazyListLecturersQuery,
  useRemoveLecturerMutation,
  useUpdateLecturerMutation
} from '../../agent/lecturerApliSlice';
import LecturerTable, { lecturerActions } from '../../sections/cms/academic/lecturer-table';
import { reducerBuilder } from '../../utils/reducer-builder';
import { FormProvider, useForm } from 'react-hook-form';
import SchoolTable, { schoolActions } from '../../sections/cms/academic/school-table';
import {
  useAddSchoolMutation,
  useLazyListSchoolsQuery,
  useRemoveSchoolMutation,
  useUpdateSchoolMutation
} from '../../agent/schoolApiSlice';
import Field from '../../components/auto-form/components/Field';
import { useResetPasswordMutation } from '../../agent/authApiSlice';
import {
  useAddStudentMutation,
  useLazyListStudentQuery,
  useRemoveStudentMutation,
  useUpdateStudentMutation
} from '../../agent/studentApliSlice';
import StudentTable, { studentActions } from '../../sections/cms/academic/student-table';
import { useAsyncReducer } from '../../hooks/use-async-reducer';
import { getLecturerAddEditFields } from '../../sections/cms/academic/lecturer-add-edit-fields';
import { getStudentAddEditFields } from '../../sections/cms/academic/student-add-edit-fields';
import { schoolAddEditFields } from '../../sections/cms/academic/school-add-edit-fields';
import ProjectTable, { projectActions } from '../../sections/cms/projects/project-table';
import {
  useAddProjectMutation,
  useLazyListProjectsQuery, useRemoveProjectMutation,
  useUpdateProjectMutation
} from '../../agent/projectApliSlice';
import { getProjectAddEditFields } from '../../sections/cms/projects/project-add-edit-fields';

const DialogContent = (props) => {
  const { methods, dialogState } = props;
  return <>
    {dialogState.Component && <dialogState.Component/>}
    <Stack spacing={2}>
      {dialogState.fields?.map((field, index) => {
        return field.hidden
          ? null
          : <Field key={index} {...field} defaultValue={dialogState.formValues[field.name]}/>;
      })}
    </Stack>
  </>;
};

const Page = memo(() => {
  const [
    getSchools, {
      data: schoolData,
      error: schoolError,
      isLoading: isLoadingSchool,
      isFetching: isFetchingSchool
    }
  ] = useLazyListSchoolsQuery();
  const [
    getProjects, {
      data: projectData,
      error: projectError,
      isLoading: isLoadingProject,
      isFetching: isFetchingProject
    }
  ] = useLazyListProjectsQuery();
  const [addProject, { isLoading: isAddingProject }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdatingProject }] = useUpdateProjectMutation();
  const [removeProject, { isLoading: isRemovingProject }] = useRemoveProjectMutation();

  const isPageLoading =
    isFetchingSchool
    | isFetchingProject
    | isAddingProject
    | isUpdatingProject
    | isRemovingProject
  ;

  const pageTitle = 'Project Management';
  const tabs = ['Project'];
  const dialogConfig = useDialog();

  const pageActions = {
    onTabChange: 'onTabChange',
    onDialogCancel: 'onDialogCancel',
    onDialogAddOpen: 'onDialogAddOpen',
    ...projectActions
  };

  const projectAddEditFields = useMemo(() => getProjectAddEditFields(schoolData?.items), [schoolData]);

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

  const actionHandlers = useCallback((state, action) => {
    const { type, payload, dispatch } = action;
    return [
      [pageActions.onTabChange, { ...state, tab: payload }],
      [
        /onDialog.*Open/g.test(type),
        () => {
          dialogConfig.onOpen();
        },
        { isVoid: true }
      ],
      [
        pageActions.onDialogCancel, () => {
        dialogConfig.onClose();
        return {
          ...state,
          dialogState: initialDialogState
        };
      }
      ],
      [
        pageActions.onDialogAddOpen, () => {
        dispatch({type: 'edit'})
        switch (state.tab) {
          case 0:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add a project',
                formValues: { name: '', schoolId: null },
                submitAction: pageActions.onDialogProjectAddSubmit,
                fields: projectAddEditFields
              }
            };
          default:
            return state;
        }
      }
      ],
      [
        projectActions.onDialogProjectAddSubmit, () => {
        addProject(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        projectActions.onDialogProjectEditOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Edit project',
            formValues: payload,
            submitAction: projectActions.onDialogProjectEditSubmit,
            fields: projectAddEditFields
          }
        };
      }
      ],
      [
        projectActions.onDialogProjectEditSubmit, () => {
        updateProject(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return {...state};
      }
      ],
      [
        projectActions.onDialogProjectRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove Project',
          data: payload,
          submitAction: projectActions.onDialogProjectRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the project
              '<Typography component={'span'} fontWeight={'bold'}>{payload.name}</Typography>'
            </Typography>
          </Box>
          ,
          actionProps: {
            submitText: 'Remove',
            submitButtonProps: {
              color: 'error',
            },
            cancelButtonProps: {
              variant: 'contained'
            }
          },
        }
      }
      ],
      [
        projectActions.onDialogProjectRemoveSubmit, () => {
        removeProject(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        'edit_pending', () => {
          console.log('pending edit')
          return state;
      }
      ],
      [
        'edit_fulfilled', () => {
          console.log('edit fulfilled')
          return state;
      }
      ],
      [
        'edit_rejected', () => {
          console.log('edit_rejected')
        return state;
      }
      ]
    ];
  }, [dialogConfig, projectAddEditFields]);

  const reducer = useMemo(() => reducerBuilder(actionHandlers), [actionHandlers]);

  const initialState = useMemo(() =>
    ({
      tab: 0,
      dialogState: initialDialogState
    }),
    [initialDialogState]
  )

  const asyncReducer = useMemo(() => ({
      edit: () => Promise.resolve(true)
    }), [])

  const [{ tab, dialogState }, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);

  useEffect(() => {
    getSchools({page: 0, rowsPerPage: 100})
    getProjects({page: 0, rowsPerPage: 100})
  }, []);

  let projectTableConfig = useTable({
    data: projectData?.items,
    options: {
      searching: {
        mapItem: (item) => {
          let obj = {...item}
          delete obj.id
          return obj;
        }
      }
    },
    initialRowsPerPage: 10
  });

  const methods = useForm({
    // defaultValues: dialogState.formValues,
    values: dialogState.formValues
  });

  const defaultActions = useMemo(() => dialogConfig.getDefaultActions({
    disableSubmitting: dialogState.disableSubmitting,
    onSubmit: methods.handleSubmit((data) => pageDispatch({
      type: dialogState.submitAction,
      payload: data
    })),
    onCancel: () => pageDispatch({ type: pageActions.onDialogCancel }),
    ...dialogState.actionProps
  }), [dialogConfig, dialogState]);

  useEffect(() => {
    methods.reset();
  }, [dialogState]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => 10000 }}
          open={!!isPageLoading}
        >
          <CircularProgress color="inherit"/>
        </Backdrop>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Stack spacing={1}>
                <Tabs
                  value={tab}
                  onChange={(_, value) => pageDispatch({
                    type: pageActions.onTabChange,
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
                >
                  {tabs.map((_tab, index) => (index === tab ?
                    <Typography key={index} component={Typography} variant={'h4'} gradient>{_tab}</Typography> :
                    <Tab key={index} label={_tab} value={index}/>))}
                </Tabs>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="primary"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon/>
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="primary"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon/>
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => pageDispatch({ type: pageActions.onDialogAddOpen })}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  variant="gradient"
                >
                  Add
                </Button>
              </div>
            </Stack>

            {tab === 0 && <>
              <ProjectTable
                tableConfig={projectTableConfig}
                pageDispatch={pageDispatch}
                searching={true}
                schoolList={schoolData?.items}
              />
            </>}
          </Stack>
        </Container>
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
          <DialogContent methods={methods} dialogState={dialogState}/>
        </FormProvider>
      </EDialog>
    </>
  );
});

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>

);

export default Page;