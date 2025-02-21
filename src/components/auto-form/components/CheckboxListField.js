import {useEffect, useState} from 'react'
import {Box, Button, FormControl, FormLabel, Paper, TextField, Typography} from '@mui/material'
import {useFormContext} from 'react-hook-form'
import clsx from 'clsx'
import LabeledCheckbox from "./LabeledCheckbox";
import {isEqual} from "lodash";
import PropTypes from "prop-types";
import {KeyboardArrowDown} from "@mui/icons-material";

export default function CheckboxListField(props) {
    const [expand, setExpand] = useState(true);
    const {name, defaultValue = [], rules, label, options, classes, ...other} = props
    const {setValue, getValues, watch, formState: {errors}} = useFormContext()
    const [selectedItems, setSelectedItems] = useState(defaultValue || getValues(name))
    const [filteredOptions, setFilterOptions] = useState(options)
    const [searchText, setSearchText] = useState('');

    const handleToggleExpand = () => {
        setExpand(prev => !prev);
    }
    const handleSelect = (value) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(prevItems => prevItems.filter(item => item !== value))
        } else {
            setSelectedItems((prevItems) => [...prevItems, value])
        }
    }

    const selectedAll = isEqual(selectedItems, filteredOptions.map(option => option.value));
    const handleSelectAll = () => {
        if (selectedAll) {
            setSelectedItems(prev => prev.filter(item => filteredOptions.includes(item)))
        } else {
            setSelectedItems(filteredOptions.map(option => option.value));
        }
    }

    const handleSearch = () => {
        setFilterOptions(options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase())));
    }

    useEffect(() => {
        handleSearch();
    }, [searchText])

    useEffect(() => {
        setValue(name, selectedItems)
    }, [selectedItems])

    return (
        <Box className={'flex flex-col'}>
            <Button className={'justify-between px-5'} onClick={handleToggleExpand}>
                <Typography>{selectedItems.map(item => options.find(option => option.value === item).label).join(', ') || 'Select'}</Typography>
                <KeyboardArrowDown/>
            </Button>
            {expand &&
                <FormControl size={'small'} variant={'outlined'}>
                    <FormLabel component='legend' className={clsx(classes?.label)}>{label}</FormLabel>
                    <Paper className={'flex flex-1 flex-col p-5 gap-5'}>
                        <TextField
                            size={'small'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Box className={'overflow-auto max-h-40'}>
                            <LabeledCheckbox
                                classes={{
                                    root: 'block'
                                }}
                                label={'Select all'}
                                checked={selectedAll}
                                onChange={() => {
                                    handleSelectAll();
                                }}
                            />
                            {filteredOptions.map(option => {
                                return (
                                    <LabeledCheckbox
                                        key={option.value}
                                        classes={{
                                            root: 'block'
                                        }}
                                        label={option.label}
                                        checked={selectedItems.includes(option.value)}
                                        onChange={() => {
                                            handleSelect(option.value)
                                        }}/>
                                )
                            })}
                        </Box>
                    </Paper>
                </FormControl>
            }
        </Box>
    )
}

CheckboxListField.prototype = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}
