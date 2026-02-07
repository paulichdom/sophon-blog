import { createFileRoute } from '@tanstack/react-router';
import { CategoryResultsLayout } from '@/components/CategoryResults/CategoryResultsLayout';

export const Route = createFileRoute('/$categoryId')({
  component: CategoryRoute,
});

function CategoryRoute() {
  const { categoryId } = Route.useParams();
  return <CategoryResultsLayout selectedCategory={categoryId} />;
}
