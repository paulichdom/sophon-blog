import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/editor/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/editor/$slug"!</div>
}
