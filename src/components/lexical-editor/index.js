import dynamic from 'next/dynamic';

const EditorComposer = dynamic(() => import('verbum').then(module => module.EditorComposer), {ssr: false})
  const Editor = dynamic(() => import('verbum').then(module => module.Editor), {ssr: false})
  const ToolbarPlugin = dynamic(() => import('verbum').then(module => module.ToolbarPlugin), {ssr: false})
  const AlignDropdown = dynamic(() => import('verbum').then(module => module.AlignDropdown), {ssr: false})
  const BackgroundColorPicker = dynamic(() => import('verbum').then(module => module.BackgroundColorPicker), {ssr: false})
  const BoldButton = dynamic(() => import('verbum').then(module => module.BoldButton), {ssr: false})
  const CodeFormatButton = dynamic(() => import('verbum').then(module => module.CodeFormatButton), {ssr: false})
  const FloatingLinkEditor = dynamic(() => import('verbum').then(module => module.FloatingLinkEditor), {ssr: false})
  const FontFamilyDropdown = dynamic(() => import('verbum').then(module => module.FontFamilyDropdown), {ssr: false})
  const FontSizeDropdown = dynamic(() => import('verbum').then(module => module.FontSizeDropdown), {ssr: false})
  const InsertDropdown = dynamic(() => import('verbum').then(module => module.InsertDropdown), {ssr: false})
  const InsertLinkButton = dynamic(() => import('verbum').then(module => module.InsertLinkButton), {ssr: false})
  const ItalicButton = dynamic(() => import('verbum').then(module => module.ItalicButton), {ssr: false})
  const TextColorPicker = dynamic(() => import('verbum').then(module => module.TextColorPicker), {ssr: false})
  const TextFormatDropdown = dynamic(() => import('verbum').then(module => module.TextFormatDropdown), {ssr: false})
  const UnderlineButton = dynamic(() => import('verbum').then(module => module.UnderlineButton), {ssr: false})
  const Divider = dynamic(() => import('verbum').then(module => module.Divider), {ssr: false})


// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   AlignDropdown,
//   BackgroundColorPicker,
//   BoldButton,
//   CodeFormatButton,
//   FloatingLinkEditor,
//   FontFamilyDropdown,
//   FontSizeDropdown,
//   InsertDropdown,
//   InsertLinkButton,
//   ItalicButton,
//   TextColorPicker,
//   TextFormatDropdown,
//   UnderlineButton,
//   Divider,
// } from 'verbum'

export default function LexicalEditor() {
   return (
     <EditorComposer>
       <Editor hashtagsEnabled={true}>
         <ToolbarPlugin defaultFontSize="20px">
           <FontFamilyDropdown />
           <FontSizeDropdown />
           <Divider />
           <BoldButton />
           <ItalicButton />
           <UnderlineButton />
           <CodeFormatButton />
           <InsertLinkButton />
           <TextColorPicker />
           <BackgroundColorPicker />
           <TextFormatDropdown />
           <Divider />
           <InsertDropdown enablePoll={true} />
           <Divider />
           <AlignDropdown />
         </ToolbarPlugin>
       </Editor>
     </EditorComposer>
   )
}