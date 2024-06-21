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
    getLecturers, {
      data: lecturerData,
      error: lecturerError,
      isLoading: isLoadingLecturer,
      isFetching: isFetchingLecturer
    }
  ] = useLazyListLecturersQuery();
  const [
    getStudents, {
      data: studentData,
      error: studentError,
      isLoading: isLoadingStudent,
      isFetching: isFetchingStudent
    }
  ] = useLazyListStudentQuery();
  const [addSchool, { isLoading: isAddingSchool }] = useAddSchoolMutation();
  const [updateSchool, { isLoading: isUpdatingSchool }] = useUpdateSchoolMutation();
  const [removeSchool, { isLoading: isRemovingSchool }] = useRemoveSchoolMutation();
  const [addLecturer, { isLoading: isAddingLecturer }] = useAddLecturerMutation();
  const [updateLecturer, { isLoading: isUpdatingLecturer }] = useUpdateLecturerMutation();
  const [removeLecturer, { isLoading: isRemovingLecturer }] = useRemoveLecturerMutation();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdatingStudent }] = useUpdateStudentMutation();
  const [removeStudent, { isLoading: isRemovingStudent }] = useRemoveStudentMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
  console.log('academic renders');
  console.log(schoolData);

  const isPageLoading = isFetchingLecturer
    | isFetchingSchool
    | isAddingSchool
    | isUpdatingSchool
    | isRemovingSchool
    | isFetchingLecturer
    | isAddingLecturer
    | isUpdatingLecturer
    | isRemovingLecturer
    | isFetchingStudent
    | isAddingStudent
    | isUpdatingStudent
    | isRemovingStudent
    | isResettingPassword
  ;

  const pageTitle = 'Academic Management';
  const tabs = ['School', 'Lecturer', 'Student'];
  const dialogConfig = useDialog();

  const pageActions = {
    onTabChange: 'onTabChange',
    onDialogCancel: 'onDialogCancel',
    onDialogAddOpen: 'onDialogAddOpen',
    ...schoolActions,
    ...lecturerActions
  };

  const lecturerAddEditFields = useMemo(() => getLecturerAddEditFields(schoolData?.items), [schoolData]);
  const studentAddEditFields = useMemo(() => getStudentAddEditFields(schoolData?.items), [schoolData]);

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
        console.log(lecturerAddEditFields)
        switch (state.tab) {
          case 0:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add a school',
                formValues: { name: '', isActive: true },
                submitAction: schoolActions.onDialogSchoolAddSubmit,
                fields: schoolAddEditFields
              }
            };
          case 1:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add a lecturer',
                formValues: {
                  name: '',
                  email: '',
                  description: '',
                  phoneNumber: '',
                  schoolId: null,
                  isActive: true
                },
                fields: lecturerAddEditFields,
                submitAction: lecturerActions.onDialogLecturerAddSubmit
              }
            };
          case 2:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add a student',
                formValues: {
                  name: '',
                  email: '',
                  description: '',
                  phoneNumber: '',
                  schoolId: null,
                  isActive: true
                },
                fields: studentAddEditFields,
                submitAction: studentActions.onDialogStudentAddSubmit
              }
            };
          default:
            return state;
        }
      }
      ],
      [
        schoolActions.onDialogSchoolAddSubmit, () => {
        addSchool(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        lecturerActions.onDialogLecturerAddSubmit, () => {
        addLecturer(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        studentActions.onDialogStudentAddSubmit, () => {
        addStudent(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        schoolActions.onDialogSchoolEditOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Edit school',
            formValues: payload,
            submitAction: schoolActions.onDialogSchoolEditSubmit,
            fields: schoolAddEditFields
          }
        };
      }
      ],
      [
        lecturerActions.onDialogLecturerEditOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Update lecturer\'s information',
          formValues: payload,
          submitAction: lecturerActions.onDialogLecturerEditSubmit,
          fields: lecturerAddEditFields
        }
      }
      ],
      [
        studentActions.onDialogStudentEditOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Update student\'s information',
          formValues: payload,
          submitAction: studentActions.onDialogStudentEditSubmit,
          fields: studentAddEditFields
        }
      }
      ],
      [
        schoolActions.onDialogSchoolEditSubmit, () => {
        updateSchool(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return {...state};
      }
      ],
      [
        lecturerActions.onDialogLecturerEditSubmit, () => {
        updateLecturer(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return {...state};
      }
      ],
      [
        studentActions.onDialogStudentEditSubmit, () => {
        updateStudent(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return {...state};
      }
      ],
      [
        schoolActions.onDialogSchoolRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove School',
          data: payload,
          submitAction: schoolActions.onDialogSchoolRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the school
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
        lecturerActions.onDialogLecturerRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove Lecturer',
          data: payload,
          submitAction: lecturerActions.onDialogLecturerRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the lecturer
              '<Typography component={'span'} fontWeight={'bold'}>{payload.fullName}</Typography>'
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
        studentActions.onDialogStudentRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove Student',
          data: payload,
          submitAction: studentActions.onDialogStudentRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the student
              '<Typography component={'span'} fontWeight={'bold'}>{payload.fullName}</Typography>'
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
        schoolActions.onDialogSchoolRemoveSubmit, () => {
        removeSchool(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        lecturerActions.onDialogLecturerRemoveSubmit, () => {
        removeLecturer(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        studentActions.onDialogStudentRemoveSubmit, () => {
        removeStudent(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        type === lecturerActions.onDialogLecturerResetPasswordOpen || type === studentActions.onDialogStudentResetPasswordOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Reset Password',
          data: payload,
          Component: () => <Box>
            <Typography>Are you sure you want to reset <Typography component={'span'} fontWeight={'bold'}>{payload.name} ({payload.email})</Typography> account's password?</Typography>
          </Box>,
          actionProps: {
            submitButtonProps: {
              color: 'warning',
            },
            cancelButtonProps: {
              variant: 'contained'
            }
          },
          submitAction: lecturerActions.onDialogLecturerResetPasswordSubmit,
        }
      }
      ],
      [
        lecturerActions.onDialogLecturerResetPasswordSubmit, () => {
        if (state.dialogState.data?.email) {
          resetPassword({email: state.dialogState.data.email}).unwrap().then(() => dialogConfig.onClose());
        }
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
  }, [dialogConfig, lecturerAddEditFields, studentAddEditFields]);

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
  }, []);

  let schoolTableConfig = useTable({
    data: schoolData?.items,
    options: {
      searching: {
        mapItem: (item) => {
          let obj = {...item, status: item.isActive ? 'Active' : 'Inactive'}

          delete obj.id
          delete obj.isActive

          return obj;
        }
      }
    },
    initialRowsPerPage: 10
  });

  let lecturerTableConfig = useTable({
    getPageItems: (query) => {
        getLecturers(query);
    },
    pageItemsResult: lecturerData ? {
      items: lecturerData.items,
      pagination: { count: lecturerData.pagination?.totalCount }
    } : null
  });

  let studentTableConfig = useTable({
    getPageItems: (query) => {
      getStudents(query);
    },
    pageItemsResult: studentData ? {
      items: studentData.items,
      pagination: { count: studentData.pagination?.totalCount }
    } : null
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
              <SchoolTable
                tableConfig={schoolTableConfig}
                pageDispatch={pageDispatch}
                searching={true}/>
            </>}
            {tab === 1 && <>
              <LecturerTable
                tableConfig={lecturerTableConfig}
                pageDispatch={pageDispatch}
                searching={true}/>
            </>}
            {tab === 2 && <>
              <StudentTable
                tableConfig={studentTableConfig}
                pageDispatch={pageDispatch}
                searching={true}/>
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