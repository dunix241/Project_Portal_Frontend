import { ETable } from '../../../components/table';
import { SvgIcon } from '@mui/material';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Search } from '../../../components/search';
import { memo } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { formatDate } from '../../../utils/time';

export const semesterActions = {
  onDialogSemesterEditOpen: 'onDialogSemesterEditOpen',
  onDialogSemesterRemoveOpen: 'onDialogSemesterRemoveOpen',
  onDialogSemesterAddSubmit: 'onDialogSemesterAddSubmit',
  onDialogSemesterEditSubmit: 'onDialogSemesterEditSubmit',
  onDialogSemesterRemoveSubmit: 'onDialogSemesterRemoveSubmit',
  onSemesterViewProjects: 'onSemesterViewProjects'
}

const SemesterTable = memo((props) => {
  const {searching, tableConfig, pageDispatch} = props

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
          label: 'Dates',
          render: (item) => {
            return <>{formatDate(item.startDate)} - {formatDate(item.endDate)}</>
          }
        },
        {
          label: 'Registration Dates',
          render: (item) => {
            return <>{formatDate(item.startRegistrationDate)} - {formatDate(item.endRegistrationDate)}</>
          }
        }
      ]}
      options={{
        sortable: true
      }}
      actions={[
        {
          title: 'Edit Semester',
          children: <SvgIcon><PencilSquareIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: semesterActions.onDialogSemesterEditOpen,
            payload: item
          }),
          props: {
            color: 'success'
          }
        },
        {
          title: 'View Projects',
          children: <SvgIcon><AcademicCapIcon/></SvgIcon>,
          onClick: (item) => pageDispatch({
            type: semesterActions.onSemesterViewProjects,
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
            type: semesterActions.onDialogSemesterRemoveOpen,
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

export default SemesterTable