import {ReactNode, useState} from 'react';
import {Button} from '@mui/material';

type RenderDefaultActionsProps = {
  onSubmit: () => void,
  onCancel: () => void,
  disableSubmitting: boolean,
  cancelText: string,
  submitText: string
}
type DialogProps = {
  open: boolean,
  setOpen: (prev: any) => void,
  onClose: () => void,
  onOpen: () => void,
  renderDefaultActions: (props: RenderDefaultActionsProps) => ReactNode,
}
export const useDialog = (): DialogProps => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }

  const renderDefaultActions = (props: RenderDefaultActionsProps): ReactNode => {
    const {onSubmit, onCancel, disableSubmitting, cancelText = 'Cancel', submitText = 'Okay'} = props
    return <>
      {cancelText && <Button size={'small'} onClick={onCancel}>{cancelText}</Button>}
      {submitText && <Button size={'small'} variant={'contained'} onClick={onSubmit} disabled={disableSubmitting}>{submitText}</Button>}
    </>
  }

  return {
    open,
    setOpen,
    onClose,
    onOpen,
    renderDefaultActions
  }
}