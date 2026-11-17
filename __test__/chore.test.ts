import { afterEach, describe, expect, it, vi } from 'vitest'

import judgeProcessEnv from '../src/chore/judgeProcessEnv.js'
import myBanner from '../src/chore/myBanner.js'

describe('myBanner', () => {
  it('renders the package meta as a licence banner', () => {
    expect(myBanner({
      name: '@cycjimmy/config-lib',
      version: '4.0.0',
      homepage: 'https://github.com/cycjimmy/config-lib',
      license: 'MIT',
    })).toBe(`/*!
 * @cycjimmy/config-lib v4.0.0
 * Homepage: https://github.com/cycjimmy/config-lib
 * Released under the MIT License.
 */`)
  })

  it('falls back to empty values', () => {
    expect(myBanner()).toBe(`/*!
 *  v
 * Homepage: 
 * Released under the  License.
 */`)
  })
})

describe('judgeProcessEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('reads NODE_ENV at import time', async () => {
    expect(judgeProcessEnv).toEqual({
      IS_DEVELOPMENT: false,
      IS_PRODUCTION: false,
      IS_DEPLOYMENT: false,
    })
  })

  it('flags the production environment', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.resetModules()
    const { default: flags } = await import('../src/chore/judgeProcessEnv.js')

    expect(flags).toEqual({
      IS_DEVELOPMENT: false,
      IS_PRODUCTION: true,
      IS_DEPLOYMENT: false,
    })
  })

  it('flags the deployment environment', async () => {
    vi.stubEnv('NODE_ENV', 'deployment')
    vi.resetModules()
    const { default: flags } = await import('../src/chore/judgeProcessEnv.js')

    expect(flags).toEqual({
      IS_DEVELOPMENT: false,
      IS_PRODUCTION: false,
      IS_DEPLOYMENT: true,
    })
  })
})
