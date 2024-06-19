import { autoFieldList } from '../../../components/auto-form/auto-fields';

export const getLecturerAddEditFields = (schoolList) => {
  console.log(schoolList);
  const result = [
    {
      name: 'firstName',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'First Name',
      rules: { required: 'First name is required' }
    },
    {
      name: 'lastName',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Last Name',
      rules: { required: 'Last name is required' }
    },
    {
      name: 'title',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Title',
    },
    {
      name: 'email',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Email',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Invalid email'
        }
      }
    },
    {
      name: 'phoneNumber',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Phone Number'
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
  ]
  console.log(result)
  return result
}
