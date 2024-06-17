import { useState } from 'react';
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Search } from 'src/components/search';
import { ETable } from 'src/components/table';
import { useTable } from 'src/hooks/table/use-table';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EDialog } from 'src/components/dialog';
import { useDialog } from 'src/hooks/use-dialog';
import {
  useAddCouponUserMutation,
  useLazyListCouponUsersQuery,
  useRemoveCouponUserMutation
} from 'src/agent/couponApiSlice';
import { useRouter } from 'next/router';
import { Autocomplete } from '@mui/lab';
import { useListUsersQuery } from '../../../../agent/userApiSlice';

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  const {item, users} = data

  if (dialogType === 'add_couponUser') {
    const identifiers = ['userName', 'email']
    return <Stack spacing={1}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Identify User By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.userIdentifier || identifiers[0]}
          label={'Identify User By'}
          size={'small'}
          onChange={(event) => handleActions('userIdentifier', event.target.value)}
        >
          {identifiers.map((option, index) => <MenuItem key={index} value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
      <Autocomplete
        options={users || []}
        value={users?.find(user => user.id === data.userId) || null}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option[data.userIdentifier || identifiers[0]] || ''}
        onChange={(_, value) => handleActions('userId', value?.id)}
        renderInput={(params) => <TextField {...params} size={'small'} label="User" />}
      />
    </Stack>
  }

  if (dialogType === 'remove_couponUser') {
    return <Box>
      <Typography>{`Are you sure you want to remove this User from the Coupon?`}</Typography>
      <Typography>{`- Username: ${users?.find(user => user.id === item.userId)?.userName}`}</Typography>
      <Typography>{`- Email: ${users?.find(user => user.id === item.userId)?.email}`}</Typography>
    </Box>
  }
  return null;
}

const Page = () => {
  const [trigger, {data, error, isLoading, isFetching}] = useLazyListCouponUsersQuery()
  const [addCouponUser, {isLoading: isCreatingCouponUser}] = useAddCouponUserMutation()
  const [removeCouponUser, {isLoading: isRemovingCouponUser}] = useRemoveCouponUserMutation()
  const {data: usersData, error: usersError, isFetching: isFetchingUsers} = useListUsersQuery()
  const isPageLoading = isFetching || isCreatingCouponUser || isRemovingCouponUser

  const router = useRouter()
  const {id} = router.query;
  console.log(id);

  let tableConfig = useTable({
    getPageItems: (query) => {
      trigger({...query, couponId: id}).unwrap()
    },
    pageItemsResult: data ? {items: data.items, pagination: {count: data.pagination?.totalCount}} : null
  });

  const title = 'Eligible Users';
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
    if (dialogType === 'add_couponUser') {
      return !data.userId
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'add_couponUser') {
      handleOpenDialog(actionType, 'Add User', data)
    } else if (actionType === 'remove_couponUser') {
      handleOpenDialog(actionType, 'We Remind You', data)
    } else if (actionType === 'back') {
      router.back()
    } else if (actionType === 'submit') {
      if (dialogState.dialogType === 'add_couponUser') {
        addCouponUser({couponId: data.couponId, userId: data.userId}).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'remove_couponUser') {
        removeCouponUser(data.item).then(result => dialogConfig.onClose())
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
          py: 8,
        }}
      >
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => 10000 }}
            open={isPageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container maxWidth="xl">
          <Button
            startIcon={(
              <SvgIcon><ChevronLeftIcon/></SvgIcon>
            )}
            sx={{mb: 1}}
            onClick={() => handleActions('back')}
          >
            Back
          </Button>
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
                  onClick={() => handleActions('add_couponUser', {couponId: id, item: {}, users: usersData?.items})}
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
            <Search />
            <ETable
              {...tableConfig}
              columns={[
                {
                  label: 'Username',
                  render: (item) => usersData.items?.find(user => user.id === item.userId)?.userName
                },
                {
                  label: 'Email',
                  render: (item) => usersData.items?.find(user => user.id === item.userId)?.email
                },
              ]}
              options={{
                sortable: true
              }}
              actions={[
                {
                  title: 'Remove User',
                  children: <SvgIcon><TrashIcon/></SvgIcon>,
                  onClick: (item) => handleActions('remove_couponUser', {item: item, users: usersData.items}),
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
