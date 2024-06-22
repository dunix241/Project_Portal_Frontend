import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Editor } from '../../editor';

export default function RichTextEditor(props) {
    const {control, setValue, watch, formState: {errors}} = useFormContext();
    const {name, label, rules, defaultValue, inputProps, ...other} = props;

    return (
        <Box className={'flex flex-col gap-1 text-center'}>
          {label && <Typography>{label}</Typography>}
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({field}) => {
                  return (
                    <Editor
                      {...other}
                      {...field}
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