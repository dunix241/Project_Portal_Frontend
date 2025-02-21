import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import {Box, Button, IconButton, InputAdornment, Link, Stack, TextField, Typography} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import { Icon } from '@iconify/react';
import { setCredentials } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { useRegisterMutation } from '../../agent/authApiSlice';
import { LoadingButton } from '@mui/lab';

const Page = () => {
  let dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAuth();
  const {control, handleSubmit, formState: {errors}, reset, setError} = useForm({
    defaultValue: {
      name: '',
      email: '',
      password: '',
      address:'',
      userName:''
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onClick = (credentials) => {
      register(credentials).unwrap()
      .then(user => {
        console.log('reset');
        // reset()
      // console.log("on click" + user);
      // dispatch(setCredentials(user));
      // auth.skip();
      })
      // .then(() => router.push('/'))
  };

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    console.log(error);
    if (error) {
      Object.keys(error.data.errors).forEach(field => error.data.errors[field].forEach((error, index) => {
          const _field = `${field[0].toLowerCase()}${field.substring(1)}`;
          console.log(_field);
          setError(_field, {type: `apiValidationError${field}${index}`, message: error})
        }
      ));
    }
    }, [error]);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <>
      <Head>
        <title>
          Register
        </title>
      </Head>
      <Box
        sx={{
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
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>

              </Typography>
            </Stack>
            <form>
              <Stack spacing={3}>
                <Controller
                  name='Name'
                  control={control}
                  rules={{required: 'Name is required'}}
                  render={({field}) => (
                    <TextField {...field} label="Name"/>
                  )}
                />
                {errors.name &&
                  <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors.name.message}
                  </Typography>}

                <Controller
                  name='userName'
                  control={control}
                  rules={{required: 'User name is required'}}
                  render={({field}) => (
                    <TextField {...field} label="User Name"/>
                  )}
                />
                {errors.userName &&
                  <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors.userName.message}
                  </Typography>}

                <Controller
                  name='email'
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Should be an email',
                    }
                  }}
                  render={({field}) => (
                    <TextField type={'email'} {...field} label="Email address"/>
                  )}
                />
                {errors.email &&
                  <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors.email.message}
                  </Typography>}

                <Controller
                  name='address'
                  control={control}
                  rules={{required: 'Address is required'}}
                  render={({field}) => (
                    <TextField {...field} label="Address"/>
                  )}
                />
                {errors.address &&
                  <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors.address.message}
                  </Typography>}

                <Controller
                  name='password'
                  control={control}
                  rules={{
                    required: 'Password is required',
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/i,
                      message: 'Password should be more complex'
                    }
                  }}
                  render={({field}) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.password &&
                  <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors.password.message}
                  </Typography>}

                {isSuccess && <Typography variant="subtitle2" sx={{mt: 2, color: 'success.main', textAlign: 'center'}}>
                  Registered successfully
                </Typography>}
              </Stack>

              <LoadingButton

                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={handleSubmit(onClick)}
                loading={isLoading}
              >
                Continue
              </LoadingButton>
            </form>
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
