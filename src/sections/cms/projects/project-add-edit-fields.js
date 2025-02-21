import { autoFieldList } from '../../../components/auto-form/auto-fields';

export const getProjectAddEditFields = (schoolList) => {
  console.log(schoolList);
  const result = [
    {
      name: 'name',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Name',
      rules: { required: 'Name is required' }
    },
    {
      name: 'schoolId',
      component: autoFieldList.autocomplete,
      getOptionLabel: (option) => schoolList?.find(school => school.id === option)?.name || '',
      options: schoolList?.map(school => school.id) || [],
      defaultValue: schoolList?.at(0)?.id || null,
      inputProps: {
        label: 'School',
        size: 'small'
      }
    }
  ]
  console.log(result)
  return result
}
