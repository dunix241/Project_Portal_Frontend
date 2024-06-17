import { Autocomplete as MuiAutocomplete, Box, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

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
                render={({field: {onChange, ...field}}) => {
                  return (
                    <MuiAutocomplete
                      {...other}
                      {...field}
                      onChange={(e, value) => onChange(value)}
                      renderInput={(params) => <TextField {...params} {...inputProps} />}
                    />
                  )
                }}
                onChange={([, data]) => data}
            />
            {errors[name] &&
                <Typography variant="subtitle2" sx={{my: 2, color: 'error.main', textAlign: 'center'}}>
                    {errors[name].message}
                </Typography>}
        </Box>
    )
}