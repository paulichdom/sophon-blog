import { ArticleEditor } from '@/components/ArticleEditor/ArticleEditor';
import { useArticleEditor } from '@/components/ArticleEditor/use-article-editor';
import { fetchArticle } from '@/queries/article/article.api';
import { Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/editor/$slug')({
  loader: async ({params}) => fetchArticle(params.slug),
  component: RouteComponent,
})

function RouteComponent() {
  const article = Route.useLoaderData()

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
        isEdit
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
