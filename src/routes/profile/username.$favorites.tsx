import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/username/$favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/username/$favorites"!</div>
}
