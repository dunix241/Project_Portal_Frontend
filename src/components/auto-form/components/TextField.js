import {Box, TextField as MuiTextField, Typography} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {useState} from "react";

export default function TextField(props) {
    const {control, setValue, watch, formState: {errors}} = useFormContext();
    const {name, rules, defaultValue, ...other} = props;
    const [text, setText] = useState(defaultValue || '');

    const length = text.length;
    const handleChange = (e) => {
        if (!rules?.maxLength || e.target.value.length <= rules?.maxLength.value) {
            setText(e.target.value);
            setValue(name, e.target.value);
        }
    }

    return (
        <Box className={'flex flex-col gap-1 text-center'}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({field}) => (
                    <MuiTextField
                      type={'text'}
                      {...other}
                      {...field}
                      value={text}
                      onChange={handleChange}
                      error={!!errors[name]}
                      helperText={errors[name] && errors[name].message}
                    />
                )}
            />
            {rules?.maxLength &&
                <Typography sx={{color: rules.maxLength.value - length === 0 ? 'error.main' : 'primary.main'}}>
                    {rules.maxLength.value - length}/{rules.maxLength.value} characters left
                </Typography>
            }
        </Box>
    )
}