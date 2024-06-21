import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateRangePicker, MultiInputDateRangeField } from '../../../libs/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function DateTimeRangeField(props) {
    const {control, setValue, watch, formState: {errors}} = useFormContext();
    const {name, rules, defaultValue, inputProps, localText, ...other} = props;

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
                      <MultiInputDateRangeField
                        slotProps={{
                          textField: ({position}) => ({
                            label: position === 'start' ? localText?.start || 'Start' : localText?.end || 'End'
                          })
                        }}
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