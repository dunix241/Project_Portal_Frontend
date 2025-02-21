import {useState} from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import {
  Box,
  Button,
  Container, Dialog,
  FormControl, InputLabel,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {Search} from 'src/components/search';
import {ETable} from '../../components/table';
import {useTable} from '../../hooks/table/use-table';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import {EDialog} from '../../components/dialog';
import {useDialog} from '../../hooks/use-dialog';
import {styled} from "@mui/material/styles";
import {
  useCreateOrderMutation,
  useEditOrderMutation, useLazyListOrderDetailsQuery,
  useLazyListOrdersQuery, useListOrdersQuery,
} from "../../agent/orderApiSlice";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {status} from "nprogress";
import {SeverityPill} from "../../components/severity-pill";

const now = new Date();

const data = [

];

const Root = styled(FormControl)({
  '& .MuiOutlinedInput-notchedOutline': {
    boxShadow: 'unset !important',
  }
});

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  const statuses = ['Preparing', 'Delivering', 'Delivered', 'Cancelled']
  if (dialogType === 'edit_order') {
    return <Stack spacing={1}>
      <Root fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.status}
          onChange={(event)=> handleActions('status', event.target.value)}
          label="Status"
        >
          {
            statuses.map((status, index) => <MenuItem disabled={data.initialStatus !== 'Preparing' && status === 'Cancelled'} key={index} value={status}>{status}</MenuItem>)
          }
        </Select>
      </Root>
    </Stack>
  }
  return null
}

const Page = () => {
  const [trigger, {data, error, isLoading, isFetching}] = useLazyListOrdersQuery()
  const [createOrder, {isLoading: isCreatingOrder}] = useCreateOrderMutation()
  const [updateOrder, {isLoading: isUpdatingOrder}] = useEditOrderMutation()
  const {data: orderDetailsData, error: orderDetailsError, isFetching: isFetchingOrderDetails} = useLazyListOrderDetailsQuery()
  const isPageLoading = isFetching || isCreatingOrder || isUpdatingOrder
  const {data: orders, isLoading: isOrdersLoading, isOrdersFetching} = useListOrdersQuery()
  console.log(orders)

  let tableConfig = useTable({
    getPageItems: (query) => {
      trigger(query).unwrap()
    },
    pageItemsResult: data ? {items: data.items, pagination: {count: data.pagination?.totalCount}} : null
  });
  const title = 'Orders';
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
    // if (dialogType === 'edit_order') {
    //   return !data.name || !data.email || !data.phone
    // }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'edit_order') {
      handleOpenDialog(actionType, 'Edit Order', data)
    } else if (actionType === 'submit') {
      console.log('submitting', data);
      if (dialogState.dialogType === 'edit_order') {
          updateOrder(data).then(result => dialogConfig.onClose())
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
            </Stack>
            <Search />
            <ETable
              count={data?.length}
              {...tableConfig}
              columns={[
                {
                  field: 'fullName',
                  label: 'Name',
                },
                {
                  field: 'email',
                  label: 'Email'
                },
                {
                  field: 'address',
                  label: 'Address',
                },
                {
                  field: 'phoneNumber',
                  label: 'Phone'
                },
                {
                  field: 'note',
                  label: 'Note'
                },
                {
                  label: 'Status',
                  render: (data) => {
                    console.log(data.status)
                    if (data.status === 'Preparing') {
                      return <SeverityPill color={'success'}>Preparing</SeverityPill>
                    } else if (data.status === 'Delivering')
                    return <SeverityPill sx={{color: '#4338CA'}}>Delivering</SeverityPill>
                    else if (data.status === 'Delivered')
                      return <SeverityPill sx={{color: '#2F3746'}}>Delivered</SeverityPill>
                    else if (data.status === 'Cancelled')
                      return <SeverityPill color={'error'}>Cancelled</SeverityPill>
                  }
                }
              ]}
              actions={[
                {
                  title: 'Edit Order',
                  children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
                  onClick: (item) => {
                    handleActions('edit_order', {...item, initialStatus: item.status})
                  },
                },
              ]}
              options={{
                sortable: true,
                collapsible: {
                  title: 'Show order details',
                  renderCollapsibleRow: (item) => {

                    return <></>
                  },
                }
              }}
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
          onCancel: () => handleActions('cancel'),
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
