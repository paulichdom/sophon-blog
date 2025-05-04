import { FC, Fragment, useEffect } from 'react';
import { IconClock, IconTag } from '@tabler/icons-react';
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
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handlePublishArticle: () => void;
  publishArticlePending: boolean;
  generateArticlePrompt: string;
  onChangeGenerateArticlePrompt: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateArticle: () => void;
  generateArticlePending: boolean;
  handleUpdateArticle?: () => void;
  updateArticlePending?: boolean;
};

export const ArticleEditor: FC<ArticleEditorProps> = ({
  isEdit = false,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  content,
  onChangeContent,
  tags,
  setTags,
  handlePublishArticle,
  publishArticlePending,
  generateArticlePrompt,
  onChangeGenerateArticlePrompt,
  handleGenerateArticle,
  generateArticlePending,
  handleUpdateArticle,
  updateArticlePending,
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

  const hasValidArticleInput = title.length > 3 && description.length > 3;

  const isPublishLoading = publishArticlePending || updateArticlePending;
  const isPublishDisabled = !hasValidArticleInput || publishArticlePending || updateArticlePending;

  return (
    <Container fluid p={0}>
      <TextInput
        variant="filled"
        size="md"
        label="Title"
        placeholder="Enter article title"
        mb="lg"
        value={title}
        onChange={(event) => onChangeTitle(event.currentTarget.value)}
        required
      />
      <Textarea
        variant="filled"
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
      {!isEdit && (
        <TagsInput
          variant="filled"
          mt="md"
          label="Include a topic"
          description="Add or change topics (up to 5) so readers know what your story is about"
          placeholder="Add a topic..."
          maxTags={5}
          defaultValue={['first', 'second']}
          splitChars={[',', ' ', '|']}
          clearable
          acceptValueOnBlur
          leftSection={<IconTag size={16} />}
          value={tags}
          onChange={setTags}
        />
      )}
      <Flex direction="column" mt="lg" align="flex-end">
        <InfoAlert title="Content Moderation Notice">{INFO_ALERT_TEXT}</InfoAlert>
        <Flex gap={12}>
          {!isEdit && (
            <Fragment>
              <Button
                variant="subtle"
                color="cyan"
                radius="xl"
                leftSection={<IconClock size={16} />}
                disabled={isPublishDisabled}
              >
                Schedule for later
              </Button>
              <Button variant="light" color="cyan" radius="xl" disabled={isPublishDisabled}>
                Save Draft
              </Button>
            </Fragment>
          )}
          <Button
            fullWidth={false}
            loading={isPublishLoading}
            disabled={isPublishDisabled}
            color="green"
            radius="xl"
            onClick={isEdit ? handleUpdateArticle : handlePublishArticle}
          >
            {isEdit ? 'Update Article' : 'Publish'}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
