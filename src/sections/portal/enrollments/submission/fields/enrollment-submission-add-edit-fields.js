import { autoFieldList } from '../../../../../components/auto-form/auto-fields';
import { MenuItem, TextField } from '@mui/material';

const getSubmissionStatusColor = (status) => {
  return status === 'Submitted' && 'grey'
    || status === 'Completed' && 'warning'
    || status === 'Accepted' && 'success'
    || status === 'Rejected' && 'error'
}

export const getEnrollmentSubmissionAddEditFields = (props) => {
  return [
    {
      name: 'description',
      component: autoFieldList.textField,
      fullWidth: true,
    },
    {
      name: 'dueDate',
      component: autoFieldList.dateTimePicker,
      slots: {
        textField: (params) => <TextField fullWidth {...params} />
      },
      rules: {required: 'Due Date is required'}
    },
    {
      name: 'status',
      component: autoFieldList.autocomplete,
      fullWidth: true,
      options: ['Submitted', 'Completed', 'Accepted', 'Rejected'],
      disableClearable: true,
      defaultValue: null,
      renderOption: (props, option) => {
        const color = getSubmissionStatusColor(option)
        return <MenuItem
          sx={{
          ...(color && {color: `${color}.main`} || {})
        }}
        >{option}</MenuItem>
      },
      inputProps: {
        label: 'Status',
        size: 'small'
      },
      hidden: (fields) => !fields['status']
    },
  ]
}