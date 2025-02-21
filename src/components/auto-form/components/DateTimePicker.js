import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as RootDateTimePicker } from '@mui/x-date-pickers';

export default function DateTimePicker(props) {
  const {control, setValue, watch, formState: {errors}} = useFormContext();
  const {name, rules, defaultValue, inputProps, ...other} = props;

  return (
    <Box className={'flex flex-col gap-1 text-center'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({field}) => {
            return (
              <RootDateTimePicker
                {...other}
                {...field}
              />
            )
          }}
        />
      </LocalizationProvider>
      {errors[name] &&
        <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
          {errors[name].message}
        </Typography>}
    </Box>
  )
}
