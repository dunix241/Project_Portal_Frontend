import theme from './themes/theme';
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { $isLinkNode, AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import React, { forwardRef, ReactNode, useCallback, useEffect } from 'react';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { parseEditorState } from 'lexical/LexicalUpdates';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import SubmitPlugin from './plugins/SubmitPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';

type PlaceholderProps = {
  text: string | null
}
function Placeholder(props: PlaceholderProps) : ReactNode {
  const {text} = props
  return <div className="editor-placeholder">{text}</div>;
}

export const editorConfig : InitialConfigType = {
  // The editor theme
  theme: theme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ],
};

type EditorProps = Partial<{
  value: any
}> & EditorBodyProps

type EditorBodyProps = Partial<{
  onChange: (value: string) => void
  placeholder?: string,
  readOnly?: boolean
}>

export const Editor = forwardRef((props : EditorProps, ref): ReactNode  => {
  const {value, onChange, readOnly, placeholder, ...other} = props;

  return (
    <LexicalComposer initialConfig={{...editorConfig, ...other, editorState: value, editable: !readOnly}}>
      <EditorBody
        {...props}
      />
    </LexicalComposer>
  );
})

export const EditorBody = forwardRef((props: EditorProps, ref) => {
  const { value, onChange, placeholder, readOnly, ...other } = props;
  // useEffect(() => {
  //   editor.dispatchCommand(CLEAR_EDITOR_COMMAND, null);
  // }, [])

  return readOnly
    ? <RichTextPlugin
      contentEditable={<ContentEditable contentEditable={false}/>}
      ErrorBoundary={LexicalErrorBoundary}
    />
    :
    <div className="editor-container" style={{ margin: 0, maxWidth: 'unset', width: '100%' }}>
      {/*<EditorRefPlugin editorRef={ref}/>*/}
      <ToolbarPlugin/>
      <div className="editor-inner" style={{ backgroundColor: 'transparent' }}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input"/>}
          placeholder={<Placeholder text={placeholder}/>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin/>
        {/* <TreeViewPlugin /> */}
        <AutoFocusPlugin/>
        <CodeHighlightPlugin/>
        <OnChangePlugin onChange={(editorState) => {
          onChange?.(JSON.stringify(editorState));
        }}/>
        <ListPlugin/>
        <LinkPlugin/>
        <AutoLinkPlugin/>
        <ListMaxIndentLevelPlugin maxDepth={7}/>
        <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>

        <AutoFocusPlugin/>
        <ClearEditorPlugin/>
        <AutoLinkPlugin/>
      </div>
    </div>;
})