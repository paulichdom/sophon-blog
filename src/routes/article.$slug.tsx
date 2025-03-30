import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/article/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/article/$slug"!</div>
}
