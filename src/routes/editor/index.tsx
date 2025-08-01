import { createFileRoute, redirect } from '@tanstack/react-router';
import { currentUserQueryOptions } from '@/auth/auth.queries';
import { ArticleEditor } from '@/components/ArticleEditor/ArticleEditor';
import { useArticleEditor } from '@/components/ArticleEditor/use-article-editor';
import { queryClient } from '@/queryClient';

export const Route = createFileRoute('/editor/')({
  beforeLoad: async () => {
    try {
      const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions);
      if (!currentUser) throw redirect({ to: '/login' });
    } catch (error) {
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
  );
}
