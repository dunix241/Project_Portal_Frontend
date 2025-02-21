import { autoFieldList } from '../../../../components/auto-form/auto-fields';

export const getEnrollmentTeamMemberAddEditFields = (props) => {
  const {studentData, lecturerData} = props
  return [
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
    },
  ]
}