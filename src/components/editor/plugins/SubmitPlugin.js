import { Button } from '@mui/material';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

export default function SubmitPlugin(props) {
  const {onSubmit, ...other} = props

  const [editor] = useLexicalComposerContext();

  return <Button
    {...other}
    onClick={() => {
      onSubmit?.()
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
    }}
  />
}