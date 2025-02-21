import React from 'react';
import { OnChangePlugin as Root } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

export default function OnChangePlugin(props) {
  const {onChange} = props
  const [editor] = useLexicalComposerContext();

  return <Root onChange={(editorState) => {
    const root = $getRoot()
    const selection = root.select();
    const htmlString = $generateHtmlFromNodes(editor, selection | null);
    onChange?.(htmlString);
  }}/>
}