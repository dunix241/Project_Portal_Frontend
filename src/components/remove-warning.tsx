import { Typography } from '@mui/material';

type RemoveWarningProps = {
  text?: string,
  resourceName: string,
  name?: string
}

export default function RemoveWarning(props: RemoveWarningProps) {
  const {text = 'Are you sure you would like to remove the',resourceName, name} = props
  return <Typography>{text} {resourceName} {name && "'"}<Typography component={'span'} fontWeight={'bold'}>{name}</Typography>{name && "'"}</Typography>
}

export function getDangerActionProps(props) {
  const {submitText = 'Remove', cancelText = 'Cancel'} = props || {}

  return {
    submitText: submitText,
    submitButtonProps: {
      color: 'error'
    },
    cancelButtonProps: {
      variant: 'contained'
    },
    cancelText: cancelText
  };
}