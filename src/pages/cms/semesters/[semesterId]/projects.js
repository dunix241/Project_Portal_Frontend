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
  TextField,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from '../../../../layouts/dashboard/layout';
import { useTable } from '../../../../hooks/table/use-table';
import { EDialog } from '../../../../components/dialog';
import { useDialog } from '../../../../hooks/use-dialog';
import { reducerBuilder } from '../../../../utils/reducer-builder';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '../../../../components/auto-form/components/Field';
import { useAsyncReducer } from '../../../../hooks/use-async-reducer';
import { useLazyListSemestersQuery } from '../../../../agent/semesterApliSlice';
import { semesterAddEditFields } from '../../../../sections/cms/semesters/semester-add-edit-fields';
import {
  useAddProjectSemesterMutation,
  useLazyListProjectSemestersQuery,
  useRemoveProjectSemesterMutation,
  useUpdateProjectSemesterMutation
} from '../../../../agent/projectSemesterApliSlice';
import ProjectSemesterTable, { projectSemesterActions } from '../../../../sections/cms/semesters/projects/project-semester-table';
import { Autocomplete } from '@mui/lab';
import { useLazyListProjectsQuery } from '../../../../agent/projectApliSlice';
import { Search } from '../../../../components/search';
import { useRouter } from 'next/router';
import {
  getProjectSemesterAddEditFields,
  projectSemesterAddEditFields
} from '../../../../sections/cms/semesters/projects/project-semester-add-edit-fields';
import dayjs from 'dayjs';

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

const Page = memo((props) => {
  const [
    getProjects, {
      data: projectData,
      error: projectError,
      isLoading: isLoadingProject,
      isFetching: isFetchingProject
    }
  ] = useLazyListProjectsQuery();
  const [
    getSemesters, {
      data: semesterData,
      error: semesterError,
      isLoading: isLoadingSemester,
      isFetching: isFetchingSemester
    }
  ] = useLazyListSemestersQuery();

  const [
    getProjectSemesters, {
      data: projectSemesterData,
      error: projectSemesterError,
      isLoading: isLoadingProjectSemester,
      isFetching: isFetchingProjectSemester
    }
  ] = useLazyListProjectSemestersQuery();
  const [addProjectSemester, { isLoading: isAddingProjectSemester }] = useAddProjectSemesterMutation();
  const [updateProjectSemester, { isLoading: isUpdatingProjectSemester }] = useUpdateProjectSemesterMutation();
  const [removeProjectSemester, { isLoading: isRemovingProjectSemester }] = useRemoveProjectSemesterMutation();

  const isPageLoading =
    isFetchingSemester
    | isAddingProjectSemester
    | isUpdatingProjectSemester
    | isRemovingProjectSemester
  ;

  const pageTitle = 'Semester Project Management';
  const tabs = ['Semester', 'Project'];
  const dialogConfig = useDialog();
  const router = useRouter()

  const {semesterId} = router.query;
  const semester = semesterData?.items.find(item => item.id === semesterId) || semesterData?.items[0] || null
  const selectedSemesterId = semester?.id || semesterId;
  const projectSemesterAddEditFields = getProjectSemesterAddEditFields(projectData?.items)

  useEffect(() => {
    if (selectedSemesterId !== semesterId && semesterData.items[0]) {
      router.push(`/cms/semesters/${semesterData.items[0].id}/projects`)
    }
  }, [selectedSemesterId]);

  const pageActions = {
    onTabChange: 'onTabChange',
    onDialogCancel: 'onDialogCancel',
    onDialogAddOpen: 'onDialogAddOpen',
    onSelectSemester: 'onSelectSemester',
    ...projectSemesterActions
  };

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
      [pageActions.onTabChange, () => {
        if (payload === 0) {
          router.push('/cms/semesters')
        }
        return { ...state, tab: payload }
      }],
      [pageActions.onSelectSemester, () => {
        if (payload !== semesterId) {
          router.push(`/cms/semesters/${payload}/projects`)
        }
        return state
      }],
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
          case 1:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add Project',
                formValues: { name: '', schoolId: null },
                submitAction: projectSemesterActions.onDialogProjectSemesterAddSubmit,
                fields: projectSemesterAddEditFields
              }
            };
          default:
            return state;
        }
      }
      ],
      [
        projectSemesterActions.onDialogProjectSemesterAddSubmit, () => {
        const body = {
          semesterId,
          ...payload
        }
        addProjectSemester(body).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        projectSemesterActions.onDialogProjectSemesterEditOpen, () => {
        const formValues = {
          ...payload,
          dueDate: dayjs(payload.dueDate).toDate()
        }
        console.log(formValues)
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Edit Project',
            formValues: formValues,
            submitAction: projectSemesterActions.onDialogProjectSemesterEditSubmit,
            fields: projectSemesterAddEditFields
          }
        };
      }
      ],
      [
        projectSemesterActions.onDialogProjectSemesterEditSubmit, () => {
        const body = {
          semesterId,
          ...payload
        }
        updateProjectSemester(body).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return {...state};
      }
      ],
      [
        projectSemesterActions.onDialogProjectSemesterRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove Semester',
          data: payload,
          submitAction: projectSemesterActions.onDialogProjectSemesterRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the project
              '<Typography component={'span'} fontWeight={'bold'}>{projectData?.items.find(project => project.id === payload.projectId)?.name}</Typography>'
              from the semester
              '<Typography component={'span'} fontWeight={'bold'}>{semester?.name}</Typography>'
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
        projectSemesterActions.onDialogProjectSemesterRemoveSubmit, () => {
        removeProjectSemester(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
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
  }, [dialogConfig]);

  const reducer = useMemo(() => reducerBuilder(actionHandlers), [actionHandlers]);

  const initialState = useMemo(() =>
    ({
      tab: 1,
      dialogState: initialDialogState
    }),
    [initialDialogState]
  )

  const asyncReducer = useMemo(() => ({
      edit: () => Promise.resolve(true)
    }), [])

  const [{ tab, dialogState }, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);

  useEffect(() => {
    getProjects({page: 0, rowsPerPage: 100})
    getSemesters({page: 0, rowsPerPage: 100})
  }, []);

  let projectSemesterTableConfig = useTable({
    getPageItems: (query) => {
      getProjectSemesters({...query, semesterId: selectedSemesterId});
    },
    pageItemsResult: projectSemesterData ? {
      items: projectSemesterData.items,
      pagination: { count: projectSemesterData.pagination?.totalCount }
    } : null
  }, [selectedSemesterId]);

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
            <Search {...projectSemesterTableConfig.useSearch()} StartComponent={() =>
              <Autocomplete
                options={semesterData?.items.map(item => item.id) || []}
                getOptionLabel={(option) => semesterData?.items.find(item => item.id === option)?.name || option}
                value={semesterId}
                onChange={(_, value) => pageDispatch({type: pageActions.onSelectSemester, payload: value})}
                disableClearable
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Semester" />}
              />
            }/>
            {tab === 1 && <>
              <ProjectSemesterTable
                tableConfig={projectSemesterTableConfig}
                pageDispatch={pageDispatch}
                projectList={projectData?.items}
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