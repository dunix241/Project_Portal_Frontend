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
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import React, { ReactNode } from 'react';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { SetInitialValuePlugin } from './plugins/SetInitialValuePlugin';

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
  ]
  // nodes: [
  //   HeadingNode,
  //   ListNode,
  //   ListItemNode,
  //   QuoteNode,
  //   CodeNode,
  //   TableNode,
  //   TableCellNode,
  //   TableRowNode,
  //   HashtagNode,
  //   CodeHighlightNode,
  //   AutoLinkNode,
  //   LinkNode,
  //   OverflowNode,
  //   PollNode,
  //   StickyNode,
  //   ImageNode,
  //   InlineImageNode,
  //   MentionNode,
  //   EmojiNode,
  //   ExcalidrawNode,
  //   EquationNode,
  //   AutocompleteNode,
  //   KeywordNode,
  //   HorizontalRuleNode,
  //   TweetNode,
  //   YouTubeNode,
  //   FigmaNode,
  //   MarkNode,
  //   CollapsibleContainerNode,
  //   CollapsibleContentNode,
  //   CollapsibleTitleNode,
  //   PageBreakNode,
  //   LayoutContainerNode,
  //   LayoutItemNode,
  // ];
};

type EditorProps = Partial<{
  value: InitialEditorStateType
  onChange: (value: string) => void
  placeholder?: string
}>

export function Editor(props : EditorProps): ReactNode {
  const {value, onChange, placeholder, ...other} = props;

  return (
    <LexicalComposer initialConfig={{...editorConfig, ...other, editorState: value}}>
      <div className="editor-container" style={{margin: 0}}>
        <ToolbarPlugin />
        <div className="editor-inner" style={{backgroundColor: 'transparent'}}>
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

          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <AutoLinkPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
