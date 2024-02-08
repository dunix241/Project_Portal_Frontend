import { useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Backdrop,
  Box,
  Button, Chip,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { ETable } from '../../components/table';
import { useTable } from '../../hooks/table/use-table';
import { PencilSquareIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline';
import { EDialog } from '../../components/dialog';
import { useDialog } from '../../hooks/use-dialog';
import { format } from 'date-fns';
import {
  useCreateCouponMutation,
  useEditCouponMutation,
  useLazyListCouponsQuery,
  useRemoveCouponMutation
} from '../../agent/couponApiSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateRangePicker } from 'src/libs/x-date-pickers-pro/MobileDateRangePicker';
import dayjs from 'dayjs';
import { redirect, useRouter } from 'next/navigation';
import { SeverityPill } from '../../components/severity-pill';

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  if (dialogType === 'add_coupon' || dialogType === 'edit_coupon') {
    return <Stack spacing={1}>
      <TextField
        size={'small'}
        label={'Code'}
        fullWidth
        value={data.code}
        onChange={e => handleActions('code', e.target.value)}
      />
      <TextField
        size={'small'}
        label={'Amount'}
        fullWidth
        value={data.amount}
        onChange={e => handleActions('amount', e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateRangePicker
          localeText={{ start: 'Start Time', end: 'End Time' }}
          format={'DD/MM/YYYY'}
          value={[dayjs(data.startDateTime || new Date()), dayjs(data.endDateTime || new Date())]}
          onChange={([startDateTime, endDateTime]) => (handleActions('startDateTime', startDateTime?.$d.toISOString()), handleActions('endDateTime', endDateTime?.$d.toISOString()))}
        />
      </LocalizationProvider>
    </Stack>
  }

  if (dialogType === 'remove_coupon') {
    return <Box>
      <Typography>{`Are you sure you want to remove this Coupon?`}</Typography>
      <Typography>{`Code: ${data.code}, amount: ${data.amount}`}</Typography>
    </Box>
  }
  return null;
}

const Page = () => {
  const [trigger, {data, error, isLoading, isFetching}] = useLazyListCouponsQuery()
  const [createCoupon, {isLoading: isCreatingCoupon}] = useCreateCouponMutation()
  const [updateCoupon, {isLoading: isUpdatingCoupon}] = useEditCouponMutation()
  const [removeCoupon, {isLoading: isRemovingCoupon}] = useRemoveCouponMutation()
  const isPageLoading = isFetching || isCreatingCoupon || isUpdatingCoupon || isRemovingCoupon

  const router = useRouter();

  let tableConfig = useTable({
    getPageItems: (query) => {
      trigger(query).unwrap()
    },
    pageItemsResult: data ? {items: data.items, pagination: {count: data.pagination?.totalCount}} : null
  });

  const title = 'Coupons';
  const [dialogState, setDialogState] = useState({
    dialogType: '',
    title: '',
    data: {},
  })

  const dialogConfig = useDialog();

  const handleOpenDialog = (dialogType, title, data) => {
    dialogConfig.onOpen();
    setDialogState(prev => ({
      ...prev,
      dialogType,
      title,
      data,
    }))
  }

  const disableSubmitting = () => {
    const {dialogType, data} = dialogState
    if (dialogType === 'add_coupon' || dialogType === 'edit_coupon') {
      return !data.code
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'add_coupon') {
      handleOpenDialog(actionType, 'Add Coupon', data)
    } else if (actionType === 'edit_coupon') {
      handleOpenDialog(actionType, 'Edit Coupon', data)
    } else if (actionType === 'remove_coupon') {
      handleOpenDialog(actionType, 'We Remind You', data)
    } else if (actionType === 'manage_users') {
      console.log(data.id);
      router.push(`coupons/${data.id}/users`)
    } else if (actionType === 'submit') {
      if (dialogState.dialogType === 'add_coupon') {
        createCoupon(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'edit_coupon') {
        updateCoupon(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'remove_coupon') {
        removeCoupon(data).then(result => dialogConfig.onClose())
      }
    } else if (actionType === 'cancel') {
      dialogConfig.onClose();
    } else {
      setDialogState(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [actionType]: data
        }
      }))
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
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
            open={isPageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">{title}</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={() => handleActions('add_coupon', {code: '', amount: 0, startDateTime: null, endDateTime: null})}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <ETable
              {...tableConfig}
              columns={[
                {
                  field: 'code',
                  label: 'Code'
                },
                {
                  field: 'amount',
                  label: 'Amount'
                },
                {
                  field: 'startDateTime',
                  label: 'Start Time',
                  render: (item) => <>{item?.startDateTime && format(new Date(item.startDateTime), 'dd/MM/yyyy')}</>
                },
                {
                  field: 'createDateTime',
                  label: 'End Time',
                  render: (item) => <>{item?.endDateTime && format(new Date(item.endDateTime), 'dd/MM/yyyy')}</>
                },
                {
                  label: 'Status',
                  render: (item) => {
                    const now = new Date();
                    if (new Date(item.startDateTime) <= now && now <= new Date(item.endDateTime)) {
                      return <SeverityPill color={'success'}>Active</SeverityPill>
                    }
                    return <SeverityPill color={'error'}>Inactive</SeverityPill>
                  }
                }
              ]}
              options={{
                sortable: true
              }}
              actions={[
                {
                  title: 'Manage Eligible Users',
                  children: <SvgIcon><UsersIcon/></SvgIcon>,
                  onClick: (item) => handleActions('manage_users', item),
                  props: {
                    color: 'success'
                  }
                },
                {
                  title: 'Edit Coupon',
                  children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
                  onClick: (item) => handleActions('edit_coupon', item),
                  props: {
                    color: 'success'
                  }
                },
                {
                  title: 'Remove Coupon',
                  children: <SvgIcon><TrashIcon/></SvgIcon>,
                  onClick: (item) => handleActions('remove_coupon', item),
                  props: {
                    color: 'error'
                  }
                }
              ]}
            />
          </Stack>
        </Container>
      </Box>
      <EDialog
          title={dialogState.title}
        {...dialogConfig}
        renderActions={() => dialogConfig.renderDefaultActions({
          disableSubmitting: disableSubmitting(),
          onSubmit: () => handleActions('submit', dialogState.data),
          onCancel: () => handleActions('cancel', dialogState.data),
        })}
        fullWidth
      >
        <DialogContent handleActions={handleActions} dialogType={dialogState.dialogType} data={dialogState.data}/>
      </EDialog>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
