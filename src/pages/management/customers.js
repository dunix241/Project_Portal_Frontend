import {useState} from 'react';
import Head from 'next/head';
import {format, subDays, subHours} from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Avatar, Box, Button, Container, Stack, SvgIcon, TextField, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {CustomersSearch} from 'src/sections/customer/customers-search';
import {ETable} from '../../components/table';
import {getInitials} from '../../utils/get-initials';
import {useTable} from '../../hooks/table/use-table';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {EDialog} from '../../components/dialog';
import {useDialog} from '../../hooks/use-dialog';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const DialogContent = (props) => {
  const {dialogType, data, handleActions} = props;
  if (dialogType === 'add_customer' || dialogType === 'edit_customer') {
    return <Stack spacing={1}>
      <TextField
        size={'small'}
        label={'Name'}
        fullWidth
        value={data.name}
        onChange={(event) => handleActions('name', event.target.value)}
        disabled={dialogType === 'edit_customer'}
      />
      <TextField
        size={'small'}
        label={'Email'}
        fullWidth
        value={data.email}
        onChange={(event) => handleActions('email', event.target.value)}
      />
      <TextField
        size={'small'}
        label={'Phone'}
        fullWidth
        value={data.phone}
        onChange={(event) => handleActions('phone', event.target.value)}
      />
    </Stack>
  }

  if (dialogType === 'remove_customer') {
    return <Box>
      <Typography>{`Are you sure you want to remove this customer?`}</Typography>
      <Typography>{`${data.name} - ${data.email}`}</Typography>
    </Box>
  }
  return null
}

const Page = () => {
  const tableConfig = useTable({data});
  const title = 'Customers';
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
    if (dialogType === 'add_customer' || dialogType === 'edit_customer') {
      return !data.name || !data.email || !data.phone
    }
    return false;
  }

  const handleActions = (actionType, data) => {
    if (actionType === 'add_customer') {
      handleOpenDialog(actionType, 'Add Customer', data)
    } else if (actionType === 'edit_customer') {
      handleOpenDialog(actionType, 'Edit Customer', data)
    } else if (actionType === 'remove_customer') {
      handleOpenDialog(actionType, 'We Remind You', data)
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
              <div>
                <Button
                  onClick={() => handleActions('add_customer', {name: '', email: '', phone: ''})}
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
              count={data.length}
              {...tableConfig}
              columns={[
                {
                  field: 'avatar',
                  label: 'Avatar',
                  render: (item) => {
                    return <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <Avatar src={item.avatar}>
                        {getInitials(item.name)}
                      </Avatar>
                      <Typography variant="subtitle2">
                        {item.name}
                      </Typography>
                    </Stack>;
                  }
                },
                {
                  field: 'name',
                  label: 'Name'
                },
                {
                  field: 'email',
                  label: 'Email'
                },
                {
                  field: 'address',
                  label: 'Location',
                  render: (item) => <>{item.address.city}, {item.address.state}, {item.address.country}</>
                },
                {
                  field: 'phone',
                  label: 'Phone'
                },
                {
                  field: 'createdAt',
                  label: 'Signed Up',
                  render: (item) => <>{format(item.createdAt, 'dd/MM/yyyy')}</>
                },
              ]}
              actions={[
                {
                  title: 'Edit customer',
                  children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
                  onClick: (item) => handleActions('edit_customer', item),
                },
                {
                  title: 'Remove customer',
                  children: <SvgIcon><TrashIcon/></SvgIcon>,
                  onClick: (item) => handleActions('remove_customer', item),
                }
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
