import { createFileRoute } from '@tanstack/react-router'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_API_VERSION;
  const resourcePath = 'articles';
  const url = `${apiBaseUrl}/${apiVersion}/${resourcePath}`;

const fetchArticle = async (articleSlug: string) => {
  const article = await fetch(`${url}/${articleSlug}`)

  return await article.json()
}

export const Route = createFileRoute('/article/$slug')({
  component: RouteComponent,
  loader: ({params: {slug}}) => fetchArticle(slug)
})

function RouteComponent() {
  return <div>Hello "/article/$slug"!</div>
}
