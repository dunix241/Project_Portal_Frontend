import { ETable } from '../../../../components/table';
import { SvgIcon } from '@mui/material';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../../components/search';
import { memo } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { formatDate, formatDateTime } from '../../../../utils/time';

export const projectSemesterActions = {
  onDialogProjectSemesterEditOpen: 'onDialogProjectSemesterEditOpen',
  onDialogProjectSemesterRemoveOpen: 'onDialogProjectSemesterRemoveOpen',
  onDialogProjectSemesterAddSubmit: 'onDialogProjectSemesterAddSubmit',
  onDialogProjectSemesterEditSubmit: 'onDialogProjectSemesterEditSubmit',
  onDialogProjectSemesterRemoveSubmit: 'onDialogProjectSemesterRemoveSubmit',
}

const ProjectSemesterTable = memo((props) => {
  const {searching, tableConfig, pageDispatch, projectList} = props

  return <>
    {searching && <Search {...tableConfig.useSearch()}/>}
    <ETable
      {...tableConfig}
      columns={[
        {
          label: 'Project',
          render: (item) => {
            return <>{projectList?.find(project => project.id === item.projectId)?.name || item.projectId}</>
          }
        },
        {
          field: 'slots',
          label: 'Slots',
        },
        {
          label: 'Due Date',
          render: (item) => {
            return <>{formatDateTime(item.dueDate)}</>
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
            type: projectSemesterActions.onDialogProjectSemesterEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'See List of Projects',
          children: <SvgIcon><AcademicCapIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: projectSemesterActions.onDialogProjectSemesterEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'Remove Semester',
          children: <SvgIcon><TrashIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: projectSemesterActions.onDialogProjectSemesterRemoveOpen,
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

export default ProjectSemesterTable