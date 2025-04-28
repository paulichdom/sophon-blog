import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@mantine/core';
import { ArticleEditor } from '@/components/ArticleEditor/ArticleEditor';
import { useArticleEditor } from '@/components/ArticleEditor/use-article-editor';

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    articleTitle,
    setArticleTitle,
    articleDescription,
    setArticleDescription,
    articleContent,
    setArticleContent,
    articleTags,
    setArticleTags,
    handlePublish,
    createArticlePending,
    generateArticlePrompt,
    setGenerateArticlePrompt,
    handleGenerateArticle,
    generateArticlePending,
  } = useArticleEditor();

  return (
    <Container fluid>
      <ArticleEditor
        title={articleTitle}
        onChangeTitle={setArticleTitle}
        description={articleDescription}
        onChangeDescription={setArticleDescription}
        content={articleContent}
        onChangeContent={setArticleContent}
        tags={articleTags}
        setTags={setArticleTags}
        handlePublish={handlePublish}
        createArticlePending={createArticlePending}
        generateArticlePrompt={generateArticlePrompt}
        onChangeGenerateArticlePrompt={setGenerateArticlePrompt}
        handleGenerateArticle={handleGenerateArticle}
        generateArticlePending={generateArticlePending}
      />
    </Container>
  );
}
