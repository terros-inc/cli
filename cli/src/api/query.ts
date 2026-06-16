import { getAuthorizationHeader } from './auth.ts'

export async function queryTerrosAPI(path: string, input: object): Promise<object> {
  const authorization = await getAuthorizationHeader()

  const res = await fetch(`https://api.terros.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
  })

  return await res.json() as object
}