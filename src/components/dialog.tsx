import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Root = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: '500px'
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
}

export const EDialog = (props : EDialogProps): ReactNode => {
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
};
