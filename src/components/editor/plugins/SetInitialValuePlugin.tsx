import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_HISTORY_COMMAND, $getRoot } from 'lexical';
import { useLayoutEffect } from 'react';

export const SetInitialValuePlugin: React.FC<{ initHtml: string }> = ({ initHtml = '' }) => {
  const [editor] = useLexicalComposerContext();

  useLayoutEffect(() => {
    if (editor && initHtml) {
      editor.update(() => {
        const content = $generateHtmlFromNodes(editor, null);

        if (!!initHtml && content !== initHtml) {
          const parser = new DOMParser();
          const dom = parser.parseFromString(initHtml, 'text/html');
          const nodes = $generateNodesFromDOM(editor, dom);

          const root = $getRoot();
          root.clear();

          const selection = root.select();
          selection.removeText();
          selection.insertNodes(nodes);
          editor.dispatchCommand(CLEAR_HISTORY_COMMAND, null);
        }
      });
    }
  }, [initHtml]);

  return null;
};