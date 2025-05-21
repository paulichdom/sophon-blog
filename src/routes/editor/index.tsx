import { createFileRoute, redirect } from '@tanstack/react-router';
import { Container } from '@mantine/core';
import { currentUserQueryOptions } from '@/auth/auth.queries';
import { ArticleEditor } from '@/components/ArticleEditor/ArticleEditor';
import { useArticleEditor } from '@/components/ArticleEditor/use-article-editor';
import { queryClient } from '@/queryClient';

export const Route = createFileRoute('/editor/')({
  beforeLoad: async () => {
    try {
      const { user } = await queryClient.ensureQueryData(currentUserQueryOptions);
      console.log({ user });
      if (!user) throw redirect({ to: '/login' });
    } catch {
      throw redirect({ to: '/login' });
    }
  },
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
    handlePublishArticle,
    publishArticlePending,
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
        handlePublishArticle={handlePublishArticle}
        publishArticlePending={publishArticlePending}
        generateArticlePrompt={generateArticlePrompt}
        onChangeGenerateArticlePrompt={setGenerateArticlePrompt}
        handleGenerateArticle={handleGenerateArticle}
        generateArticlePending={generateArticlePending}
      />
    </Container>
  );
}
