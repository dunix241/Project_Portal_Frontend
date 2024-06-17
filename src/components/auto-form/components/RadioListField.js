import {Controller, useFormContext} from 'react-hook-form'
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material'
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function RadioListField(props) {
    const {name, label, defaultValue = '', rules, options = [], ...other} = props
    const {answers} = useSelector(store => store.survey);
    const {control, setError, clearErrors, watch, formState: {errors}} = useFormContext()
    const answer = watch(name);
    console.log(rules)
    console.log(answer);

    useEffect(() => {
        if (rules.required || rules.required.value) {
            console.log('setting errors')
            setError(name, {type: '', message: 'Required'})
        }
    }, [])

    useEffect(() => {
        if (rules.required || rules.required.value) {
            if (answer === undefined || answer === '') {
                setError(name, {type: '', message: 'Required'})
            } else {
                console.log('clearing errors')
                clearErrors([name]);
            }
        }
    }, [answer])

    const generateRadioOptions = () => {
        return options.map(option => (
            <FormControlLabel
                key={option.value}
                value={option.value}
                label={option.label}
                control={<Radio/>}
            />
        ))
    }
    return (
        <FormControl>
            {label && <FormLabel component='legend'>{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({field, fieldState: {error}}) => {
                    const radioGroupProps = {
                        ...field,
                        ...other
                    }
                    return <RadioGroup {...radioGroupProps}>
                        {generateRadioOptions()}
                    </RadioGroup>
                }}
            />
        </FormControl>
    )
}

RadioListField.prototype = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}