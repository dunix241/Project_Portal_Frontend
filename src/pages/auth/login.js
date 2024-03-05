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
import {setCredentials} from "../../store/authSlice";
import {useLoginMutation} from "../../agent/authApiSlice";
import {useRouter } from 'next/router';
import {useAuth} from "../../hooks/use-auth";

const Page = () => {
  let dispatch = useAppDispatch();
  const auth = useAuth();
  const router = useRouter();
  const usr = useAppSelector(store => store.auth)
  console.log(usr);
  useEffect(() => {
    console.log("effect" + usr.token);
    if(usr.token){
      auth.skip();
      router.push('/');
    }
  }, []);
  const [method, setMethod] = useState('email');

  const onClick = (credentials) => {
    login(credentials).unwrap()
    .then(user => {
      console.log("on click" + user);
      dispatch(setCredentials(user));
      auth.skip();
    })
    .then(() => router.push('/'))
  };

  const {control, handleSubmit} = useForm({
    defaultValue: {
      email: '',
      password: '',
    }
    });

  const [login, { isLoading, error }] = useLoginMutation();
  console.log(error);
  // const onSubmit = (data) => {
  //   console.log(data)
  //   // dispatch(login(data))
  // };

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
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
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
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
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
                    Error
                  </Typography>}
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
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
