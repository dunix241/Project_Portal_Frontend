import { ETable } from '../../../components/table';
import { SeverityPill } from '../../../components/severity-pill';
import { SvgIcon } from '@mui/material';
import { KeyIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../components/search';

export const studentActions = {
  onDialogStudentEditOpen: 'onDialogStudentEditOpen',
  onDialogStudentRemoveOpen: 'onDialogStudentRemoveOpen',
  onDialogStudentResetPasswordOpen: 'onDialogStudentResetPasswordOpen',
  onDialogStudentAddSubmit: 'onDialogStudentAddSubmit',
  onDialogStudentEditSubmit: 'onDialogStudentEditSubmit',
  onDialogStudentRemoveSubmit: 'onDialogStudentRemoveSubmit',
  onDialogStudentResetPasswordSubmit: 'onDialogResetPasswordSubmit'
}

const StudentTable = (props) => {
  const {searching, tableConfig, pageDispatch} = props
  console.log('student table renders');

  return <>
    {searching && <Search {...tableConfig.useSearch()}/>}
    <ETable
      {...tableConfig}
      columns={[
        {
          field: 'fullName',
          label: 'Name'
        },
        {
          field: 'schoolName',
          label: 'School'
        },
        {
          field: 'isActive',
          label: 'Status',
          render: (data) => {
            if (data.isActive) {
              return <SeverityPill color={'success'}>Active</SeverityPill>;
            } else if (!data.isActive) {
              return <SeverityPill color={'error'}>Inactive</SeverityPill>;
            }
          }
        }
      ]}
      options={{
        sortable: true
      }}
      actions={[
        {
          title: 'Edit Student',
          children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: studentActions.onDialogStudentEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'Reset password',
          children: <SvgIcon><KeyIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: studentActions.onDialogStudentResetPasswordOpen,
            payload: item
          }),
          props: {
            color: 'warning'
          }
        },
        {
          title: 'Remove Student',
          children: <SvgIcon><TrashIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: studentActions.onDialogStudentRemoveOpen,
            payload: item
          }),
          props: {
            color: 'error'
          }
        }
      ]}
    />
  </>
}

export default StudentTable