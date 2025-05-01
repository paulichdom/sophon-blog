import { FC, useEffect } from 'react';
import { IconTag } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button, Container, Flex, TagsInput, Textarea, TextInput } from '@mantine/core';
import { Link } from '@mantine/tiptap';
import { InfoAlert } from '../InfoAlert/InfoAlert';
import { TextEditor } from '../TextEditor/TextEditor';
import { INFO_ALERT_TEXT } from './ArticleEditor.constants';
import { ArticleGenerator } from './components/ArticleGenerator';

type ArticleEditorProps = {
  isEdit?: boolean;
  title: string;
  onChangeTitle: (title: string) => void;
  description: string;
  onChangeDescription: (description: string) => void;
  content: string;
  onChangeContent: (content: string) => void;
  handleGenerateArticle: () => void;
  generateArticlePending: boolean;
  publishArticlePending: boolean;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  generateArticlePrompt: string;
  onChangeGenerateArticlePrompt: React.Dispatch<React.SetStateAction<string>>;
  handlePublish: () => void;
};

export const ArticleEditor: FC<ArticleEditorProps> = ({
  isEdit = false,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  content,
  onChangeContent,
  handleGenerateArticle,
  generateArticlePending,
  publishArticlePending,
  tags,
  setTags,
  generateArticlePrompt,
  onChangeGenerateArticlePrompt,
  handlePublish,
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

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  const isPublishLoading = publishArticlePending;
  const isPublishDisabled = publishArticlePending;

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
      <Textarea
        size="md"
        label="Description"
        description="Short article description"
        placeholder="Enter description here"
        mb="lg"
        value={description}
        onChange={(event) => onChangeDescription(event.currentTarget.value)}
        required
        autosize
        minRows={2}
        maxRows={2}
      />
      {!isEdit && (
        <ArticleGenerator
          generateArticlePrompt={generateArticlePrompt}
          onChangeGenerateArticlePrompt={onChangeGenerateArticlePrompt}
          handleGenerateArticle={handleGenerateArticle}
          generateArticlePending={generateArticlePending}
          publishArticlePending={publishArticlePending}
        />
      )}
      <TextEditor editor={editor} />
      <TagsInput
        mt="md"
        label="Press Enter to include a topic"
        description="Add up to 3 topics"
        placeholder="Add a topic"
        maxTags={3}
        defaultValue={['first', 'second']}
        splitChars={[',', ' ', '|']}
        clearable
        acceptValueOnBlur
        leftSection={<IconTag size={16} />}
        value={tags}
        onChange={setTags}
      />
      <Flex direction="column" mt="lg" align="flex-end">
        <InfoAlert title="Content Moderation Notice">{INFO_ALERT_TEXT}</InfoAlert>
        <Flex gap={12}>
          <Button>Save Draft</Button>
          <Button
            fullWidth={false}
            loading={isPublishLoading}
            disabled={isPublishDisabled}
            color="green"
            onClick={handlePublish}
          >
            {isEdit ? 'Update Article' : 'Publish'}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
