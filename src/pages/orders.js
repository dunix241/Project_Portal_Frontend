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
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {ETable} from '../components/table';
import {useTable} from '../hooks/table/use-table';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import {EDialog} from '../components/dialog';
import {useDialog} from '../hooks/use-dialog';
import {styled} from "@mui/material/styles";

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
          value={statuses[0]}
          label="Status"
        >
          {
            statuses.map((status, index) => <MenuItem key={index} value={status}>{status}</MenuItem>)
          }
        </Select>
      </Root>
    </Stack>
  }
  return null
}

const Page = () => {
  const tableConfig = useTable({data});
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
    if (dialogType === 'edit_order') {
      return !data.name || !data.email || !data.phone
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'edit_order') {
      handleOpenDialog(actionType, 'Edit Order', data)
    } else if (actionType === 'submit') {
      console.log('submitting');
      dialogConfig.onClose();
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
            <CustomersSearch />
            <ETable
              count={data.length}
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
                  label: 'Location',
                },
                {
                  field: 'phoneNumber',
                  label: 'Phone'
                },
                {
                  field: 'note',
                  label: 'Note'
                },
              ]}
              actions={[
                {
                  title: 'Edit order',
                  children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
                  onClick: (item) => handleActions('edit_order', item),
                },
              ]}
              options={{
                sortable: true,
                collapsible: {
                  title: 'Show order details',
                  renderCollapsibleRow: (item) => <>item.orderDetails</>,
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
          onSubmit: () => handleActions('submit'),
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
