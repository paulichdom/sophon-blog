import { UserInfo } from '@/components/UserInfo/UserInfo'
import { createFileRoute } from '@tanstack/react-router'
import { InferAllParams } from '@tanstack/react-router';

export type ProfileParams = InferAllParams<typeof Route>;

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserInfo />
}
