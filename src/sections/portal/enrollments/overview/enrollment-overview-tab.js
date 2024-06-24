import { Button, Paper } from '@mui/material';
import Autoform from '../../../../components/auto-form/components/Autoform';
import { FormProvider, useForm } from 'react-hook-form';
import { enrollmentOverviewEditFields } from './enrollment-overview-edit-fields';

export const overviewActions = {
  onOverviewUpdate: 'onOverviewUpdate'
}
export default function EnrollmentOverviewTab(props) {
  const {state, pageDispatch, enrollmentData} = props
  const methods = useForm({values: {...enrollmentData}})
  const formState = {
    formValues: enrollmentData,
    fields: enrollmentOverviewEditFields
  }

  return state.tab === 1
    ? <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 3,
        py: 4,
        borderRadius: 4,
        gap: 2
      }}
    >
      <FormProvider {...methods}>
        <Autoform methods={methods} formState={formState}/>
      </FormProvider>
      <Button
        variant={'contained'}
        sx={{
          width: 'fit-content'
        }}
        onClick={methods.handleSubmit(data => pageDispatch({type: overviewActions.onOverviewUpdate, payload: data}))}
      >
        Update
      </Button>
    </Paper>
    : null;
}