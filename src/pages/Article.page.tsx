import { useLoaderData } from 'react-router-dom';
import { Article } from '../components/Article/Article';

export const ArticlePage = () => {
  let data = useLoaderData();
  console.log({data})
  return <Article />;
}