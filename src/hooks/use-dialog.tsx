import { ReactNode, useCallback, useState } from 'react';
import {Button} from '@mui/material';

type RenderDefaultActionsProps = {
  onSubmit: () => void,
  onCancel: () => void,
  disableSubmitting: boolean,
  cancelText: string,
  submitText: string,
  cancelButtonProps: any,
  submitButtonProps: any,
}
type DialogProps = {
  open: boolean,
  setOpen: (prev: any) => void,
  onClose: () => void,
  onOpen: () => void,
  renderDefaultActions: (props: RenderDefaultActionsProps) => ReactNode,
  getDefaultActions: (props: RenderDefaultActionsProps) => any
}
export const useDialog = (): DialogProps => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false)
  }, [])
  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const getDefaultActions = useCallback((props: RenderDefaultActionsProps) => {
    const {onSubmit, onCancel, disableSubmitting, cancelText = 'Cancel', submitText = 'Okay', cancelButtonProps, submitButtonProps} = props
    return {
      submitOnEnterPressed: {
        onKeyUp: (e) => {
          const ENTER = 13;
          console.log(e.keyCode);

          if (e.keyCode === ENTER) {
            onSubmit();
          }
        }
      },
      render: () => <>
        {cancelText && <Button size={'small'} onClick={onCancel} {...cancelButtonProps}>{cancelText}</Button>}
        {submitText && <Button size={'small'} variant={'contained'} onClick={onSubmit} disabled={disableSubmitting} {...submitButtonProps}>{submitText}</Button>}
      </>
    }
  }, [])
  const renderDefaultActions = useCallback((props: RenderDefaultActionsProps): ReactNode => {
    const {onSubmit, onCancel, disableSubmitting, cancelText = 'Cancel', submitText = 'Okay', cancelButtonProps, submitButtonProps} = props
    return <>
      {cancelText && <Button size={'small'} onClick={onCancel} {...cancelButtonProps}>{cancelText}</Button>}
      {submitText && <Button size={'small'} variant={'contained'} onClick={onSubmit} disabled={disableSubmitting} {...submitButtonProps}>{submitText}</Button>}
    </>
  }, [])

  return {
    open,
    setOpen,
    onClose,
    onOpen,
    renderDefaultActions,
    getDefaultActions
  }
}