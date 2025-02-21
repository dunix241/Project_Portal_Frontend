import { autoFieldList } from '../../../../components/auto-form/auto-fields';

export const enrollmentOverviewEditFields = [
  {
    name: 'title',
    component: autoFieldList.textField,
    fullWidth: true,
    size: 'small',
    label: 'Project Title',
    rules: { required: 'Title is required' }
  },
  {
    name: 'vision',
    component: autoFieldList.textField,
    fullWidth: true,
    multiline: true,
    size: 'small',
    label: 'Vision'
  },
  {
    name: 'mission',
    component: autoFieldList.textField,
    fullWidth: true,
    multiline: true,
    size: 'small',
    label: 'Mission'
  },
  {
    name: 'canBeForked',
    component: autoFieldList.checkbox,
    fullWidth: true,
    size: 'small',
    label: 'Allow others to fork this project'
  },
  {
    name: 'heirFortunes',
    component: autoFieldList.richTextEditor,
    fullWidth: true,
    size: 'small',
    placeholder: 'Heir Fortunes',
    hidden: (fields) => {
      console.log('heir fortunes', !fields.canBeForked);
      return !fields.canBeForked;
    }
  }
];