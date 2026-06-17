import { defineProject } from 'vitest/config'

process.env.TZ = 'America/Los_Angeles'

// Bound vitest workers locally to avoid OOM. Gate on GITHUB_ACTIONS, not CI:
// the root `pnpm test` sets CI=true so vitest emits a non-interactive reporter
// (otherwise parallel turbo processes thrash the terminal cursor), but we
// still want worker caps locally. GH Actions also runs unbounded since turbo
// --concurrency 5 and a 4GB Node heap gate parallelism there.
// Override locally with `TEST_MAX_WORKERS=N pnpm test`.
const localMaxWorkers = process.env.TEST_MAX_WORKERS ? Number(process.env.TEST_MAX_WORKERS) : 2
const maxWorkers = process.env.GITHUB_ACTIONS ? undefined : localMaxWorkers

export default defineProject({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    exclude: ['**/build/**', '**/test/__fixtures__/**'],
    pool: 'threads',
    maxWorkers,
  },
})
