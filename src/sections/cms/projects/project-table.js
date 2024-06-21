import { ETable } from '../../../components/table';
import { SvgIcon } from '@mui/material';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../components/search';
import { memo } from 'react';

export const projectActions = {
  onDialogProjectEditOpen: 'onDialogProjectEditOpen',
  onDialogProjectRemoveOpen: 'onDialogProjectRemoveOpen',
  onDialogProjectAddSubmit: 'onDialogProjectAddSubmit',
  onDialogProjectEditSubmit: 'onDialogProjectEditSubmit',
  onDialogProjectRemoveSubmit: 'onDialogProjectRemoveSubmit',
}

const ProjectTable = memo((props) => {
  const {searching, tableConfig, pageDispatch, schoolList} = props

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
          field: 'schoolId',
          label: 'School',
          render: (item) => {
            return <>{schoolList?.find(school => school.id === item.schoolId)?.name}</>
          }
        },
      ]}
      options={{
        sortable: true
      }}
      actions={[
        {
          title: 'Edit Project',
          children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: projectActions.onDialogProjectEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'Remove Project',
          children: <SvgIcon><TrashIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: projectActions.onDialogProjectRemoveOpen,
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

export default ProjectTable