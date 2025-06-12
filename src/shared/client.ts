// TODO: Use axios instead of fetch and create common header with access token
export default async function (...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}
