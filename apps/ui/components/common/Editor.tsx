import { Form, Input } from 'antd';
import { Jodit } from 'jodit';
import { FC, useEffect, useRef } from 'react';
import 'jodit/build/jodit.es2018.min.css';

interface EditorProps {
  value?: string;
  setContent: (value: string) => void;
}

const Editor: FC<EditorProps> = ({ setContent, value }) => {
  useEffect(() => {
    const editor = Jodit?.make('#editor', {
      height: 650,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    });
    editor.e.on('change', () => setContent(editor.value));
    if (value) {
      editor.value = value;
    }
    return () => {
      editor.destruct();
    };
  }, [value, setContent]);
  return (
    <Form.Item label="المحتوى" required name="content">
      <Input.TextArea id="editor" />
    </Form.Item>
  );
};

export default Editor;
