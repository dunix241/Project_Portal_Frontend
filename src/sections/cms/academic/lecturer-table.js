import { ETable } from '../../../components/table';
import { SeverityPill } from '../../../components/severity-pill';
import { SvgIcon } from '@mui/material';
import { KeyIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../components/search';

export const lecturerActions = {
  onDialogLecturerEditOpen: 'onDialogLecturerEditOpen',
  onDialogLecturerRemoveOpen: 'onDialogRemoveLecturerOpen',
  onDialogLecturerResetPasswordOpen: 'onDialogLecturerResetPasswordOpen',
  onDialogLecturerAddSubmit: 'onDialogLecturerAddSubmit',
  onDialogLecturerEditSubmit: 'onDialogLecturerEditSubmit',
  onDialogLecturerRemoveSubmit: 'onDialogLecturerRemoveSubmit',
  onDialogLecturerResetPasswordSubmit: 'onDialogLecturerResetPasswordSubmit',
}

const LecturerTable = (props) => {
  const {searching, tableConfig, pageDispatch} = props
  console.log('lecturer table renders');

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
          field: 'title',
          label: 'Title'
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
          title: 'Edit Lecturer',
          children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: lecturerActions.onDialogLecturerEditOpen,
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
            type: lecturerActions.onDialogLecturerResetPasswordOpen,
            payload: item
          }),
          props: {
            color: 'warning'
          }
        },
        {
          title: 'Remove Lecturer',
          children: <SvgIcon><TrashIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: lecturerActions.onDialogLecturerRemoveOpen,
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

export default LecturerTable
