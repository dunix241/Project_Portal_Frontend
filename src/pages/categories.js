import {useState} from 'react';
import Head from 'next/head';
import {format, subDays, subHours} from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Avatar, Box, Button, Container, Stack, SvgIcon, TextField, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {ETable} from '../components/table';
import {getInitials} from '../utils/get-initials';
import {useTable} from '../hooks/table/use-table';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {EDialog} from '../components/dialog';
import {useDialog} from '../hooks/use-dialog';
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useLazyListCategoriesQuery, useRemoveCategoryMutation
} from "../agent/categoryApiSlice";

const now = new Date();

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  if (dialogType === 'add_category' || dialogType === 'edit_category') {
    return <Stack spacing={1}>
      <TextField
        size={'small'}
        label={'Name'}
        fullWidth
        value={data.name}
        onChange={(event) => handleActions('name', event.target.value)}
      />
    </Stack>
  }

  if (dialogType === 'remove_category') {
    return <Box>
      <Typography>{`Are you sure you want to remove this category?`}</Typography>
      <Typography>{`${data.name}`}</Typography>
    </Box>
  }
  return null
}

const Page = () => {
  const [trigger, {data, error, isLoading, isFetching}] = useLazyListCategoriesQuery()
  const [createCategory, {isLoading: isCreatingCategory}] = useCreateCategoryMutation()
  const [updateCategory, {isLoading: isUpdatingCategory}] = useEditCategoryMutation()
  const [removeCategory, {isLoading: isRemovingCategory}] = useRemoveCategoryMutation()
  const isPageLoading = isFetching || isCreatingCategory || isUpdatingCategory || isRemovingCategory

  const tableConfig = useTable({data});
  const title = 'Categories';
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
    if (dialogType === 'add_category' || dialogType === 'edit_category') {
      return !data.name
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'add_category') {
      handleOpenDialog(actionType, 'Add Category', data)
    } else if (actionType === 'edit_category') {
      handleOpenDialog(actionType, 'Edit Category', data)
    } else if (actionType === 'remove_category') {
      handleOpenDialog(actionType, 'We Remind You', data)
    } else if (actionType === 'submit') {
      if (dialogState.dialogType === 'add_category') {
        createCategory(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'edit_category') {
        updateCategory(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'remove_category') {
        removeCategory(data).then(result => dialogConfig.onClose())
      }
      // console.log('submitting');
      // dialogConfig.onClose();
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
              <div>
                <Button
                  onClick={() => handleActions('add_category', {name: ''})}
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
              count={data?.length}
              {...tableConfig}
              columns={[
                {
                  field: 'name',
                  label: 'Name'
                },
                {
                  label: 'Actions',
                  headerProps: {
                    sx: {
                      textAlign: 'center'
                    }
                  },
                  sortable: false,
                  render: (item) => <Stack direction={'row'}>
                    <Button onClick={() => handleActions('edit_category', item)}>
                      <SvgIcon>
                        <PencilSquareIcon/>
                      </SvgIcon>
                    </Button>
                    <Button onClick={() => handleActions('remove_category', item)}>
                      <SvgIcon>
                        <TrashIcon/>
                      </SvgIcon>
                    </Button>
                  </Stack>
                }
              ]}
              options={{
                sortable: true
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
