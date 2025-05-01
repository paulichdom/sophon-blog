import { FC } from 'react';
import { IconRobot } from '@tabler/icons-react';
import { Accordion, Button, Textarea } from '@mantine/core';
import classes from './ArticleGenerator.module.css';

type ArticleGeneratorProps = {
  generateArticlePrompt: string;
  onChangeGenerateArticlePrompt: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateArticle: () => void;
  generateArticlePending: boolean;
  publishArticlePending: boolean;
};

export const ArticleGenerator: FC<ArticleGeneratorProps> = ({
  handleGenerateArticle,
  generateArticlePending,
  publishArticlePending,
  generateArticlePrompt,
  onChangeGenerateArticlePrompt,
}) => {
  return (
    <Accordion mb="md" maw={400} classNames={classes}>
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
            disabled={generateArticlePending || publishArticlePending}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            {generateArticlePending ? 'Generating...' : 'Generate Article'}
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
