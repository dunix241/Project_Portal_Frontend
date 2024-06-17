import { memo, useCallback, useEffect, useMemo, useReducer } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container, Stack,
  SvgIcon,
  Tab,
  Tabs, Typography, Input, TextField
} from '@mui/material';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { useTable } from '../../hooks/table/use-table';
import { EDialog } from '../../components/dialog';
import { useDialog } from '../../hooks/use-dialog';
import {
  useAddLecturerMutation,
  useLazyListLecturersQuery,
  useUpdateLecturerMutation
} from '../../agent/lecturerApliSlice';
import LecturerTable, { lecturerActions } from '../../sections/cms/academic/lecturer-table';
import { reducerBuilder } from '../../utils/reducer-builder';
import { FormProvider, useForm } from 'react-hook-form';
import { autoFieldList } from '../../components/auto-form/auto-fields';
import SchoolTable, { schoolActions } from '../../sections/cms/academic/school-table';
import {
  useAddSchoolMutation,
  useLazyListSchoolsQuery,
  useUpdateSchoolMutation
} from '../../agent/schoolApiSlice';
import Field from '../../components/auto-form/components/Field';
import { useResetPasswordMutation } from '../../agent/authApiSlice';
import {
  useAddStudentMutation,
  useLazyListStudentQuery,
  useUpdateStudentMutation
} from '../../agent/studentApliSlice';
import StudentTable, { studentActions } from '../../sections/cms/academic/student-table';
import { useAsyncReducer } from '../../hooks/use-async-reducer';

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
      data: schoolResponse,
      error: schoolError,
      isLoading: isLoadingSchool,
      isFetching: isFetchingSchool
    }
  ] = useLazyListSchoolsQuery();
  const [
    getLecturers, {
      data: lecturerResponse,
      error: lecturerError,
      isLoading: isLoadingLecturer,
      isFetching: isFetchingLecturer
    }
  ] = useLazyListLecturersQuery();
  const [
    getStudents, {
      data: studentResponse,
      error: studentError,
      isLoading: isLoadingStudent,
      isFetching: isFetchingStudent
    }
  ] = useLazyListStudentQuery();
  const [addSchool, { isLoading: isAddingSchool }] = useAddSchoolMutation();
  const [updateSchool, { isLoading: isUpdatingSchool }] = useUpdateSchoolMutation();
  const [addLecturer, { isLoading: isAddingLecturer }] = useAddLecturerMutation();
  const [updateLecturer, { isLoading: isUpdatingLecturer }] = useUpdateLecturerMutation();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdatingStudent }] = useUpdateStudentMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
  console.log('academic renders');
  console.log(schoolResponse);

  const isPageLoading = isFetchingLecturer
    | isFetchingSchool
    | isAddingSchool
    | isUpdatingSchool
    | isFetchingLecturer
    | isAddingLecturer
    | isUpdatingLecturer
    | isFetchingStudent
    | isAddingStudent
    | isUpdatingStudent
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

  const schoolAddEditFields = [
    {
      name: 'name',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Name',
      rules: { required: 'Name is required' }
    },
    {
      name: 'isActive',
      component: autoFieldList.autocomplete,
      getOptionLabel: (option) => option ? 'Active' : 'Inactive',
      options: [true, false],
      defaultValue: true,
      inputProps: {
        label: 'Status',
        size: 'small'
      }
    }
  ];
  const lecturerAddEditFields = [
    {
      name: 'firstName',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'First Name',
      rules: { required: 'First name is required' }
    },
    {
      name: 'lastName',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Last Name',
      rules: { required: 'Last name is required' }
    },
    {
      name: 'title',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Title',
    },
    // {
    //   name: 'description',
    //   component: autoFieldList.textField,
    //   fullWidth: true,
    //   size: 'small',
    //   label: 'Description',
    //   hidden: true
    // },
    {
      name: 'email',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Email',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Invalid email'
        }
      }
    },
    {
      name: 'phoneNumber',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Phone Number'
    },
    {
      name: 'schoolId',
      component: autoFieldList.autocomplete,
      getOptionLabel: (option) => schoolResponse?.items.find(school => school.id === option)?.name
        || '',
      options: schoolResponse?.items.map(school => school.id) || [],
      defaultValue: schoolResponse?.items[0]?.id || null,
      inputProps: {
        label: 'School',
        size: 'small'
      }
    },
    {
      name: 'isActive',
      component: autoFieldList.autocomplete,
      getOptionLabel: (option) => option ? 'Active' : 'Inactive',
      options: [true, false],
      defaultValue: true,
      inputProps: {
        label: 'Status',
        size: 'small'
      }
    }
  ];

  const initialDialogState = useMemo(
    () => (
  {
    title: '',
    disableSubmitting: false,
    submitAction: '',
    formValues: {},
    fields: [],
    Component: null
  }), [])

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
                fields: lecturerAddEditFields,
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
        addSchool(payload).unwrap().then(() => dialogConfig.onClose());
        return state;
      }
      ],
      [
        lecturerActions.onDialogLecturerAddSubmit, () => {
        addLecturer(payload).unwrap().then(() => dialogConfig.onClose());
        return state;
      }
      ],
      [
        studentActions.onDialogStudentAddSubmit, () => {
        addStudent(payload).unwrap().then(() => dialogConfig.onClose());
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
          fields: lecturerAddEditFields
        }
      }
      ],
      [
        schoolActions.onDialogSchoolEditSubmit, () => {
        updateSchool(payload).unwrap().then(() => dialogConfig.onClose());
        return {...state, dialogState: initialDialogState};
      }
      ],
      [
        lecturerActions.onDialogLecturerEditSubmit, () => {
        updateLecturer(payload).unwrap().then(() => dialogConfig.onClose());
        return {...state, dialogState: initialDialogState};
      }
      ],
      [
        studentActions.onDialogStudentEditSubmit, () => {
        updateStudent(payload).unwrap().then(() => dialogConfig.onClose());
        return {...state, dialogState: initialDialogState};
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
  }, [dialogConfig]);
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
  const [{ tab, dialogState }, pageDispatch] = useAsyncReducer(reducer, initialState,
    asyncReducer
    );

  useEffect(() => {
    getSchools({page: 0, rowsPerPage: 100})
  }, []);

  let schoolTableConfig = useTable({
    data: schoolResponse?.items,
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
    pageItemsResult: lecturerResponse ? {
      items: lecturerResponse.items,
      pagination: { count: lecturerResponse.pagination?.totalCount }
    } : null
  });

  let studentTableConfig = useTable({
    getPageItems: (query) => {
      getStudents(query);
    },
    pageItemsResult: studentResponse ? {
      items: studentResponse.items,
      pagination: { count: studentResponse.pagination?.totalCount }
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