import { autoFieldList } from '../../../components/auto-form/auto-fields';

export const semesterAddEditFields = [
  {
    name: 'name',
    component: autoFieldList.textField,
    fullWidth: true,
    size: 'small',
    label: 'Name',
    rules: { required: 'Name is required' }
  },
  {
    name: 'dates',
    component: autoFieldList.dateRangePicker,
    localeText:{ start: 'Start Date', end: 'End Date' },
    format: 'DD/MM/YYYY',
  },
  {
    name: 'registrationDates',
    component: autoFieldList.dateRangePicker,
    localeText:{ start: 'Start Registration Date', end: 'End Registration Date' },
    format: 'DD/MM/YYYY',
  },
];
