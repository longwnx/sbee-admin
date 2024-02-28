import { Editor } from '@tinymce/tinymce-react'

type Props = {
  content?: any
  setContent?: (data: string) => void
}

const TextEditor: React.FC<Props> = ({ content, setContent }) => {
  return (
    <Editor
      apiKey="ms2488r6t6lq6w10ndkw8bisf9z6m2l59b0kp9rogugew393"
      init={{
        height: 500,
        selector: undefined,
        placeholder: 'Enter your content here',
        statusbar: false,
      }}
      plugins="print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons"
      toolbar="undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
      onEditorChange={(_, editor) => setContent && setContent(editor.getContent())}
      value={content}
    />
  )
}

export default TextEditor
