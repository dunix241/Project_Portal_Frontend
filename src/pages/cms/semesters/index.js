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
import { Layout as DashboardLayout } from '../../../layouts/dashboard/layout';
import { useTable } from '../../../hooks/table/use-table';
import { EDialog } from '../../../components/dialog';
import { useDialog } from '../../../hooks/use-dialog';
import { reducerBuilder } from '../../../utils/reducer-builder';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '../../../components/auto-form/components/Field';
import { useAsyncReducer } from '../../../hooks/use-async-reducer';
import { projectActions } from '../../../sections/cms/projects/project-table';
import {
  useAddSemesterMutation,
  useLazyListSemestersQuery,
  useRemoveSemesterMutation,
  useUpdateSemesterMutation
} from '../../../agent/semesterApliSlice';
import SemesterTable, { semesterActions } from '../../../sections/cms/semesters/semester-table';
import { semesterAddEditFields } from '../../../sections/cms/semesters/semester-add-edit-fields';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { toLocalDate } from '../../../utils/time';
dayjs.extend(utc)

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
    getSemesters, {
      data: semesterData,
      error: semesterError,
      isLoading: isLoadingSemester,
      isFetching: isFetchingSemester
    }
  ] = useLazyListSemestersQuery();
  const [addSemester, { isLoading: isAddingSemester }] = useAddSemesterMutation();
  const [updateSemester, { isLoading: isUpdatingSemester }] = useUpdateSemesterMutation();
  const [removeSemester, { isLoading: isRemovingSemester }] = useRemoveSemesterMutation();

  const isPageLoading =
    isFetchingSemester
    | isAddingSemester
    | isUpdatingSemester
    | isRemovingSemester
  ;

  const pageTitle = 'Semester Management';
  const tabs = ['Semester', 'Project'];
  const dialogConfig = useDialog();
  const router = useRouter()

  const pageActions = {
    onTabChange: 'onTabChange',
    onDialogCancel: 'onDialogCancel',
    onDialogAddOpen: 'onDialogAddOpen',
    ...semesterActions
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
        if (payload === 1) {
          router.push(`/cms/semesters/${semesterData?.items[0]?.id}/projects`)
        }
        return { ...state, tab: payload }
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
          case 0:
            return {
              ...state, dialogState: {
                ...state.dialogState,
                title: 'Add Semester',
                formValues: { name: '', schoolId: null },
                submitAction: semesterActions.onDialogSemesterAddSubmit,
                fields: semesterAddEditFields
              }
            };
          default:
            return state;
        }
      }
      ],
      [
        semesterActions.onDialogSemesterAddSubmit, () => {
        addSemester(payload).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
        return state;
      }
      ],
      [
        semesterActions.onDialogSemesterEditOpen, () => {
        return {
          ...state, dialogState: {
            ...state.dialogState,
            title: 'Edit Semester',
            formValues: {
              id: payload.id,
              name: payload.name,
              dates: [
                dayjs(payload.startDate || new Date()),
                dayjs(payload.endDate || new Date())
              ],
              registrationDates: [
                dayjs(payload.startRegistrationDate || new Date()),
                dayjs(payload.endRegistrationDate || new Date())
              ]},
            submitAction: semesterActions.onDialogSemesterEditSubmit,
            fields: semesterAddEditFields
          }
        };
      }
      ],
      [
        semesterActions.onDialogSemesterEditSubmit, () => {
        const {id, name, dates, registrationDates} = payload
        dayjs(null).daysInMonth()
        const body = {
          id,
          name,
          startDate: toLocalDate(dates[0].$d),
          endDate: toLocalDate(dates[1].$d),
          startRegistrationDate: toLocalDate(registrationDates[0].$d),
          endRegistrationDate: toLocalDate(registrationDates[1].$d)
        }
        console.log(body)
        updateSemester(body).unwrap().then(() => dispatch({ type: pageActions.onDialogCancel }));
        return {...state};
      }
      ],
      [
        semesterActions.onSemesterViewProjects, () => {
        console.log(payload);
        router.push(`semesters/${payload.id}/projects`)
        return {...state};
      }
      ],
      [
        semesterActions.onDialogSemesterRemoveOpen, {
        ...state, dialogState: {
          ...state.dialogState,
          title: 'Remove Semester',
          data: payload,
          submitAction: semesterActions.onDialogSemesterRemoveSubmit,
          Component: () => <Box>
            <Typography>Are you sure you would like to remove the semester
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
        semesterActions.onDialogSemesterRemoveSubmit, () => {
        removeSemester(state.dialogState.data).unwrap().then(() => dispatch({type: pageActions.onDialogCancel}));
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

  const [{ tab, dialogState }, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);

  let semesterTableConfig = useTable({
    getPageItems: (query) => {
      getSemesters(query);
    },
    pageItemsResult: semesterData ? {
      items: semesterData.items,
      pagination: { count: semesterData.pagination?.totalCount }
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
              <SemesterTable
                tableConfig={semesterTableConfig}
                pageDispatch={pageDispatch}
                searching={true}
                schoolList={semesterData?.items}
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