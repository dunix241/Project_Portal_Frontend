import { autoFieldList } from '../../../../components/auto-form/auto-fields';

export const getProjectSemesterAddEditFields = (projectList) => {
  return [
    {
      name: 'projectId',
      component: autoFieldList.autocomplete,
      getOptionLabel: (option) => projectList?.find(project => project.id === option)?.name || '',
      options: projectList?.map(project => project.id) || [],
      defaultValue: projectList?.at(0)?.id || null,
      inputProps: {
        label: 'Project',
        size: 'small'
      }
    },
    {
      name: 'slots',
      component: autoFieldList.textField,
      inputProps: {
        type: 'number'
      },
      fullWidth: true,
      size: 'small',
      label: 'Slots',
      rules: { required: 'Slots is required' }
    },
    {
      name: 'dueDate',
      component: autoFieldList.dateTimePicker,
      fullWidth: true,
      size: 'small',
      label: 'Due Date',
      // format: 'DD/MM/YYYY HH:mm',
    },
  ]
};
