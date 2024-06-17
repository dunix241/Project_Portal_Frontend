import { ETable } from '../../../components/table';
import { SeverityPill } from '../../../components/severity-pill';
import { SvgIcon } from '@mui/material';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../components/search';
import { memo } from 'react';

export const schoolActions = {
  onDialogSchoolEditOpen: 'onDialogSchoolEditOpen',
  onDialogSchoolRemoveOpen: 'onDialogSchoolRemoveOpen',
  onDialogSchoolAddSubmit: 'onDialogSchoolAddSubmit',
  onDialogSchoolEditSubmit: 'onDialogSchoolEditSubmit',
  onDialogSchoolRemoveSubmit: 'onDialogSchoolRemoveSubmit',
}

const SchoolTable = memo((props) => {
  const {searching, tableConfig, pageDispatch} = props
  console.log('school table renders');

  return <>
    {searching && <Search {...tableConfig.useSearch()}/>}
    <ETable
      {...tableConfig}
      columns={[
        {
          field: 'name',
          label: 'Name'
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
          title: 'Edit School',
          children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: schoolActions.onDialogSchoolEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'Remove School',
          children: <SvgIcon><TrashIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: schoolActions.onDialogSchoolRemoveOpen,
            payload: item
          }),
          props: {
            color: 'error'
          }
        }
      ]}
    />
  </>
})

export default SchoolTable