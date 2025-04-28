import { FC, useEffect } from 'react';
import { IconRobot, IconTag } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Accordion, Button, Container, Flex, TagsInput, Textarea, TextInput } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { TextEditor } from '../TextEditor/TextEditor';
import classes from './ArticleEditor.module.css';
import { InfoAlert } from '../InfoAlert/InfoAlert';
import { INFO_ALERT_TEXT } from './ArticleEditor.constants';

type ArticleEditorProps = {
  title: string;
  onChangeTitle: (title: string) => void;
  description: string;
  onChangeDescription: (description: string) => void;
  content: string;
  onChangeContent: (content: string) => void;
  handleGenerateArticle: () => void;
  generateArticlePending: boolean;
  createArticlePending: boolean;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  generateArticlePrompt: string;
  onChangeGenerateArticlePrompt: React.Dispatch<React.SetStateAction<string>>;
  handlePublish: () => void
};

export const ArticleEditor: FC<ArticleEditorProps> = ({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  content,
  onChangeContent,
  handleGenerateArticle,
  generateArticlePending,
  createArticlePending,
  tags,
  setTags,
  generateArticlePrompt,
  onChangeGenerateArticlePrompt,
  handlePublish
}) => {
  console.log({ content });
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
      <Accordion mb="md" maw={400} defaultValue="Apples" classNames={classes}>
        <Accordion.Item value={'Scaffold your article with AI'}>
          <Accordion.Control icon={<IconRobot size={20} />}>
            {'Scaffold your article with AI assistant'}
          </Accordion.Control>
          <Accordion.Panel>
            <Textarea
              size="md"
              label="Article topic"
              description="Describe article in a few words"
              placeholder="Article prompt"
              mb="lg"
              value={generateArticlePrompt}
              onChange={(event) => onChangeGenerateArticlePrompt(event.currentTarget.value)}
              autosize
              minRows={2}
              maxRows={2}
            />
            <Button
              fullWidth={false}
              onClick={handleGenerateArticle}
              loading={generateArticlePending}
              loaderProps={{ type: 'dots' }}
              disabled={generateArticlePending || createArticlePending}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              {generateArticlePending ? 'Generating...' : 'Generate Article'}
            </Button>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
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
            loading={createArticlePending}
            disabled={createArticlePending}
            color="green"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
