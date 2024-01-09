import { useState } from 'react';
import { Button } from '@mui/material';

export const useDialog = ({title}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }

  const renderDefaultActions = (props) => {
    const {onSubmit, onCancel, disableSubmitting, cancelText = 'Cancel', submitText = 'Okay'} = props
    return <>
      {cancelText && <Button size={'small'} onClick={onCancel}>{cancelText}</Button>}
      {submitText && <Button size={'small'} variant={'contained'} onClick={onSubmit} disabled={disableSubmitting}>{submitText}</Button>}
    </>
  }

  return {
    title,
    open,
    setOpen,
    onClose,
    onOpen,
    renderDefaultActions
  }
}