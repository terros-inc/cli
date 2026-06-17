import { join } from 'node:path'
import { homedir } from 'node:os'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { DateTime } from 'luxon'
import type { SavedTokens, TokenResponse } from './types.ts'
import { refreshTokens } from './auth0.ts'

export async function getTokens(): Promise<SavedTokens | null> {
  const tokens = await readTokens()
  if (tokens === null) {
    return null
  }
  if (areTokensValid(tokens)) return tokens
  const updated = await refreshTokens(tokens.refresh_token)
  return await saveTokens(updated)
}

function areTokensValid(tokens: SavedTokens): boolean {
  return tokens.expires_at > DateTime.now().minus({ minute: 5 }).toMillis()
}

async function readTokens(): Promise<SavedTokens | null> {
  try {
    const path = await getAuthFilePath()
    const file = await readFile(path, 'utf-8')
    return JSON.parse(file)
  } catch (e) {
    return null
  }
}

export async function saveTokens(tokenResponse: TokenResponse): Promise<SavedTokens> {
  const expiresAt = DateTime.now().plus({ second: tokenResponse.expires_in }).toMillis()

  const savedTokens: SavedTokens = {
    access_token: tokenResponse.access_token,
    refresh_token: tokenResponse.refresh_token,
    id_token: tokenResponse.id_token,
    token_type: tokenResponse.token_type,
    expires_at: expiresAt,
  }

  const authFile = await getAuthFilePath()
  await writeFile(authFile, JSON.stringify(savedTokens))
  return savedTokens
}

async function getAuthFilePath(): Promise<string> {
  const home = homedir()
  const configPath = join(home, '.config', 'terros')
  if (!existsSync(configPath)) {
    await mkdir(configPath, { recursive: true })
  }
  return join(configPath, 'auth.json')
}
