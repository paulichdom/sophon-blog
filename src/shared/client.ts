// TODO: Use axios instead of fetch and create common header with access token
export default async function (...args: Parameters<typeof fetch>) {
  const res = await fetch(...args)
  return await res.json()
}