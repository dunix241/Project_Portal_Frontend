import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

const Root = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '100%',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
    borderRadius: '16px',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent'
  },
  '.MuiDialogContent-root': {
    paddingTop: '20px !important'
  }
});

type Action = {
  render: () => ReactNode
}

type EDialogProps = {
  title: string,
  open: boolean,
  onClose: () => void,
  children: ReactNode,
  renderActions: () => ReactNode,
  actions: Partial<Action>[],
  dialogProps?: any,
  titleProps?: any,
  contentProps?: any,
  actionProps?:any
} & DialogProps

export const EDialog = memo((props : EDialogProps): ReactNode => {
  const {
    title,
    open,
    onClose,
    children,
    renderActions,
    actions,
    dialogProps,
    titleProps,
    contentProps,
    actionProps
  } = props;

  return (
    <Root open={open} onClose={onClose} {...dialogProps}>
      <DialogTitle {...titleProps}>{title}</DialogTitle>
      <DialogContent {...contentProps}>
        {children}
      </DialogContent>
      <DialogActions {...actionProps}>
        {actions?.map(({render, ...props}, index) => <Button key={index} {...props}>{render?.()}</Button>)}
        {renderActions?.()}
      </DialogActions>
    </Root>
  );
});
