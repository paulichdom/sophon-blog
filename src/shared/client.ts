export default async function (...args: Parameters<typeof fetch>) {
  const res = await fetch(...args)
  return await res.json()
}