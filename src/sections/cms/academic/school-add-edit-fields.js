import { autoFieldList } from '../../../components/auto-form/auto-fields';

export const schoolAddEditFields = [
  {
    name: 'name',
    component: autoFieldList.textField,
    fullWidth: true,
    size: 'small',
    label: 'Name',
    rules: { required: 'Name is required' }
  },
  {
    name: 'isActive',
    component: autoFieldList.autocomplete,
    getOptionLabel: (option) => option ? 'Active' : 'Inactive',
    options: [true, false],
    defaultValue: true,
    inputProps: {
      label: 'Status',
      size: 'small'
    }
  }
];
