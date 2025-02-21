import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Dropzone } from '@dropzone-ui/react';

export default function Autocomplete(props) {
    const {control, setValue, watch, formState: {errors}} = useFormContext();
    const {name, rules, defaultValue, inputProps, ...other} = props;

    return (
        <Box className={'flex flex-col gap-1 text-center'}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({field}) => {
                  return (
                    <Dropzone
                      accept='application/pdf'
                      maxFiles={1}
                      behaviour='replace'
                      footer={false}
                      {...other}
                      {...field}
                    />
                  )
                }}
            />
          {errors[name] &&
            <Typography
              variant="subtitle2"
              sx={{ my: 2, color: 'error.main', textAlign: 'center' }}
            >
              {errors[name].message}
            </Typography>
          }
        </Box>
    )
}