import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box, Button,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { logout, selectCurrentUser, setCredentials } from '../../store/authSlice';
import {useLoginMutation} from "../../agent/authApiSlice";
import {useRouter } from 'next/router';
import { endpointTypes } from '../../agent/axios';
import { redirectUser } from '../../utils/redirect-user';
import { EDialog } from '../../components/dialog';
import { useDialog } from '../../hooks/use-dialog';

const Page = () => {
  let dispatch = useAppDispatch();
  const router = useRouter();
  const [method, setMethod] = useState('email');

  const onClick = (credentials) => {
    // auth.signIn({}).then(() => router.push(`/${endpointTypes.cms}`))
    login(credentials).unwrap()
    .then(user => {
      dispatch(setCredentials(user));
      return user;
    })
    // .then(async user => {
    //   await auth.signIn(user)
    //   return user;
    // })
    .then((user) => {
      return router.push(redirectUser(user))
    })
  };

  const {control, handleSubmit} = useForm({
    defaultValue: {
      email: '',
      password: '',
    }
    });

  const [login, { isLoading, error }] = useLoginMutation();

  const usr = useAppSelector(selectCurrentUser)
  const dialogConfig = useDialog();
  const handleLogout = () => {
    dialogConfig.onClose();
    dispatch(logout());
    router.push('/auth/login')
  };

  useEffect(() => {
    if (usr) {
      dialogConfig.onOpen();
    }
  }, []);

  // console.log(usr);
  // useEffect(() => {
  //   if (usr.token) {
  //     auth.skip();
  //     router.push('/');
  //   }
  // }, []);

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );
  return (
    <>
      <Head>
        <title>
          Login
        </title>
      </Head>
      <EDialog
        open={dialogConfig.open}
        title={'It appears you are already logged in!'}
        titleProps={{ sx: { fontWeight: 600 } }}
        dialogProps={{
          PaperProps: {
            sx: {
              width: '550px !important',
              height: '250px'
            }
          }
        }}
        renderActions={() => dialogConfig.renderDefaultActions({
          onCancel: handleLogout,
          onSubmit: () => {
            dialogConfig.onClose()
            router.push(redirectUser(usr))
          },
          cancelText: 'Logout',
          submitText: 'Continue',
          cancelButtonProps: {
            variant: 'contained',
            color: 'error'
          },
        })}
      >
        To log into a different account, please log out first. Otherwise, you may continue with your current session.
      </EDialog>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Forget your password?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Reset password
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
            </Tabs>
            {method === 'email' && (
              <form>

                <Stack spacing={3}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <TextField type={'email'} {...field} label="Email"/>
                    )}
                  />

                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <TextField type={'password'} {...field} label="Password"/>
                    )}
                  />
                  {error && <Typography variant="subtitle2" sx={{mt: 2, color: 'error.main', textAlign: 'center'}}>
                    Incorrect Email or Password. Try again.
                  </Typography>}
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="gradient"
                  onClick={handleSubmit(onClick)}
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
