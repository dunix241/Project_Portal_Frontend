import { autoFieldList } from '../../../components/auto-form/auto-fields';

export function getProjectEnrollmentFields(props) {
  const {studentData, lecturerData} = props
  return [
    {
      name: 'projectId',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Project',
      hidden: true
    },
    {
      name: 'title',
      component: autoFieldList.textField,
      fullWidth: true,
      size: 'small',
      label: 'Project Title',
      rules: { required: 'Title is required' }
    },
    {
      name: 'students',
      component: autoFieldList.autocomplete,
      multiple: true,
      getOptionLabel: (option) => `${studentData?.find(student => student.email === option)?.fullName || ''} (${option})`,
      options: studentData?.map(student => student.email) || [],
      inputProps: {
        label: 'Students',
        size: 'small'
      }
    },
    {
      name: 'supervisors',
      component: autoFieldList.autocomplete,
      multiple: true,
      getOptionLabel: (option) => `${lecturerData?.find(lecturer => lecturer.email === option)?.fullName || ''} (${option})`,
      options: lecturerData?.map(lecturer => lecturer.email) || [],
      inputProps: {
        label: 'Supervisors',
        size: 'small'
      },
      rules: { required: 'Please specify your supervisor(s)' }
    },
    {
      name: 'vision',
      component: autoFieldList.textField,
      fullWidth: true,
      multiline: true,
      size: 'small',
      label: 'Vision',
    },
    {
      name: 'mission',
      component: autoFieldList.textField,
      fullWidth: true,
      multiline: true,
      size: 'small',
      label: 'Mission',
    },
    {
      name: 'canBeForked',
      component: autoFieldList.checkbox,
      fullWidth: true,
      size: 'small',
      label: 'Allow others to fork this project',
    },
    {
      name: 'heirFortunes',
      component: autoFieldList.richTextEditor,
      fullWidth: true,
      multiline: true,
      size: 'small',
      placeholder: 'Heir Fortunes',
      hidden: (fields) => {
        console.log('heir fortunes', !fields.canBeForked)
        return !fields.canBeForked
      }
    },
  ]
};