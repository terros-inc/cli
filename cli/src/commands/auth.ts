import { signInToAuth0 } from '../auth/auth0.ts'
import { saveTokens } from '../auth/tokens.ts'

export const authCommands = {
  login: {
    description: 'Sign in to Terros',
    async run() {
      const tokens = await signInToAuth0()
      await saveTokens(tokens)
      console.log('Signed in successfully')
    },
  },
}