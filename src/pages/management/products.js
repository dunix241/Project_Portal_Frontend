import {useState} from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Backdrop, Box, Button, CircularProgress, Container, Stack, SvgIcon, TextField, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {ETable} from '../../components/table';
import {useTable} from '../../hooks/table/use-table';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {EDialog} from '../../components/dialog';
import {useDialog} from '../../hooks/use-dialog';
import {
  useCreateProductMutation,
  useEditProductMutation,
  useLazyListProductsQuery,
  useRemoveProductMutation
} from '../../agent/productApiSlice';
import {useListCategoriesQuery} from "../../agent/categoryApiSlice";
import {Autocomplete} from "@mui/lab";
import Editor from '../../components/editor/Editor';

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  if (dialogType === 'add_product' || dialogType === 'edit_product') {
    return <Stack spacing={1}>
      <TextField
        size={'small'}
        label={'Name'}
        fullWidth
        value={data.name}
        onChange={(event) => handleActions('name', event.target.value)}
      />
      <Editor/>
      <TextField
        size={'small'}
        label={'Description'}
        fullWidth
        value={data.description}
        onChange={(event) => handleActions('description', event.target.value)}
      />
      <TextField
        size={'small'}
        label={'Price'}
        fullWidth
        value={data.price}
        onChange={(event) => handleActions('price', event.target.value)}
      />
      <TextField
          size={'small'}
          label={'Discount'}
          fullWidth
          value={data.discount}
          onChange={(event) => handleActions('discount', event.target.value)}
      />
      <TextField
          size={'small'}
          label={'Stocks'}
          fullWidth
          value={data.stocks}
          onChange={(event) => handleActions('stocks', event.target.value)}
      />
      <Autocomplete
        options={data.categories || []}
        value={data.categories.find(category => category.id === data.categoryId) || null}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name || ''}
        onChange={(_, value) => handleActions('categoryId', value?.id)}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
    </Stack>
  }

  if (dialogType === 'remove_product') {
    return <Box>
      <Typography>{`Are you sure you want to remove this product?`}</Typography>
      <Typography>{`${data.name}`}</Typography>
    </Box>
  }
  return null;
}

const Page = () => {
  const [trigger, {data, error, isLoading, isFetching}] = useLazyListProductsQuery()
  const [createProduct, {isLoading: isCreatingProduct}] = useCreateProductMutation()
  const [updateProduct, {isLoading: isUpdatingProduct}] = useEditProductMutation()
  const [removeProduct, {isLoading: isRemovingProduct}] = useRemoveProductMutation()
  const isPageLoading = isFetching || isCreatingProduct || isUpdatingProduct || isRemovingProduct
  const {data: categories, isLoading: isCategoriesLoading, isCategoriesFetching} = useListCategoriesQuery()
  console.log(categories)

  let tableConfig = useTable({
    getPageItems: (query) => {
      trigger(query).unwrap()
    },
    pageItemsResult: data ? {items: data.items, pagination: {count: data.pagination?.totalCount}} : null
  });

  const title = 'Products';
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
    if (dialogType === 'add_product' || dialogType === 'edit_product') {
      return !data.name
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'add_product') {
      handleOpenDialog(actionType, 'Add Product', data)
    } else if (actionType === 'edit_product') {
      handleOpenDialog(actionType, 'Edit Product', data)
    } else if (actionType === 'remove_product') {
      handleOpenDialog(actionType, 'We Remind You', data)
    } else if (actionType === 'submit') {
      if (dialogState.dialogType === 'add_product') {
        createProduct(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'edit_product') {
        updateProduct(data).then(result => dialogConfig.onClose())
      } else if (dialogState.dialogType === 'remove_product') {
        removeProduct(data).then(result => dialogConfig.onClose())
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
                  onClick={() => handleActions('add_product', {name: '', thumbnail: '', description: '', price: 0, discount: 0, stocks: 0, categoryId: null, categories: categories?.categories})}
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
                // {
                //   field: 'avatar',
                //   label: 'Avatar',
                //   render: (item) => {
                //     return <Stack
                //       alignItems="center"
                //       direction="row"
                //       spacing={2}
                //     >
                //       <Avatar src={item.avatar}>
                //         {getInitials(item.name)}
                //       </Avatar>
                //       <Typography variant="subtitle2">
                //         {item.name}
                //       </Typography>
                //     </Stack>;
                //   }
                // },
                {
                  field: 'name',
                  label: 'Name'
                },
                {
                  field: 'price',
                  label: 'Price'
                },
                {
                  field: 'stocks',
                  label: 'Stocks'
                },
                // {
                //   field: 'createDateTime',
                //   label: 'Created Time',
                //   render: (item) => <>{item?.createDateTime && format(item.createDateTime, 'dd/MM/yyyy')}</>
                // },
                {
                  field: 'categoryId',
                  label: 'Category Name',
                  render: (item) => categories?.categories.find(cate => cate.id === item.categoryId)?.name
                },
              ]}
              options={{
                sortable: true
              }}
              actions={[
                {
                  title: 'Edit Product',
                  children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
                  onClick: (item) => handleActions('edit_product', {...item, ...categories}),
                  props: {
                    color: 'success'
                  }
                },
                {
                  title: 'Remove Product',
                  children: <SvgIcon><TrashIcon/></SvgIcon>,
                  onClick: (item) => handleActions('remove_product', item),
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
