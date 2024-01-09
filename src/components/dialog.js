import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: '500px'
  },
  '.MuiDialogContent-root': {
    paddingTop: 8
  }
});

export const EDialog = (props) => {
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions?.map(({render, ...props}, index) => <Button key={index} {...props}>{render?.()}</Button>)}
        {renderActions?.()}
      </DialogActions>
    </Root>
  );
};

EDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  actions: PropTypes.array,
};
