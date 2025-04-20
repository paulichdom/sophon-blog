import { FC } from 'react';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Container, TextInput } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';

type ArticleEditorProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  description: string;
  onChangeDescription: (description: string) => void;
  content: string;
  onChangeContent: (content: string) => void;
};

export const ArticleEditor: FC<ArticleEditorProps> = ({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  content,
  onChangeContent,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChangeContent(editor.getHTML());
    },
  });

  return (
    <Container fluid p={0}>
      <TextInput
        size="md"
        label="Title"
        placeholder="Enter article title"
        mb="lg"
        value={title}
        onChange={(event) => onChangeTitle(event.currentTarget.value)}
        required
      />
      <TextInput
        size="md"
        label="Description"
        description="Short article description"
        placeholder="Enter description here"
        mb="lg"
        value={description}
        onChange={(event) => onChangeDescription(event.currentTarget.value)}
        required
      />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Container>
  );
};
