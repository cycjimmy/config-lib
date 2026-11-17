import type { IncomingMessage, ServerResponse } from 'node:http'

import type { MockAjaxChunk, MockAjaxRequest, MockAjaxResponse } from '../src/browsersync/2.x/middleware/makeAjax.js'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import makeAjax from '../src/browsersync/2.x/middleware/makeAjax.js'

type Listener = (payload: MockAjaxChunk) => void

interface FakeResponse extends MockAjaxResponse {
  body: string | undefined
  headers: Record<string, string>
}

function createRequest(method: string, originalUrl = '/api'): { listeners: Map<'data' | 'err', Listener>, request: MockAjaxRequest } {
  const listeners = new Map<'data' | 'err', Listener>()
  const request: MockAjaxRequest = {
    headers: {},
    method,
    originalUrl,
    connection: { remoteAddress: '127.0.0.1' },
    on: (event, listener) => {
      listeners.set(event, listener)
    },
  }

  return { listeners, request }
}

function createResponse(): FakeResponse {
  const response: FakeResponse = {
    body: undefined,
    headers: {},
    setHeader: (name, value) => {
      response.headers[name] = value
    },
    end: (body) => {
      response.body = body
    },
  }

  return response
}

describe('makeAjax', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('answers a GET request with the configured data', () => {
    const handler = makeAjax({
      apiName: 'mock',
      data: { ok: true },
      timeout: 50,
    })()
    const { request } = createRequest('GET', '/mock?foo=bar')
    const response = createResponse()
    const next = vi.fn()

    handler(request, response, next)

    expect(response.body).toBeUndefined()
    vi.advanceTimersByTime(50)

    expect(response.headers['Access-Control-Allow-Origin']).toBe('*')
    expect(response.headers['Content-Type']).toBe('application/json;charset=UTF-8')
    expect(response.body).toBe('{"ok":true}')
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('answers a request body with the configured data', () => {
    const handler = makeAjax({
      apiName: 'mock',
      data: [1, 2],
      timeout: 100,
    })()
    const { listeners, request } = createRequest('POST')
    const response = createResponse()
    const next = vi.fn()

    handler(request, response, next)
    listeners.get('data')?.('payload')
    vi.advanceTimersByTime(100)

    expect(response.body).toBe('[1,2]')
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('reports a stream error without waiting for the timeout', () => {
    const handler = makeAjax({ apiName: 'mock' })()
    const { listeners, request } = createRequest('POST')
    const response = createResponse()
    const next = vi.fn()

    handler(request, response, next)
    listeners.get('err')?.('boom')

    expect(response.body).toBe('Error:boom')
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('falls back to the request url when originalUrl is missing', () => {
    const handler = makeAjax({
      apiName: 'mock',
      data: [7],
    })()
    const { request } = createRequest('GET')
    // browser-sync hands over a bare `http.IncomingMessage`, which has no
    // `originalUrl` at all.
    delete request.originalUrl
    request.url = '/mock?foo=1'
    const response = createResponse()
    const next = vi.fn()

    handler(request, response, next)
    vi.advanceTimersByTime(200)

    expect(response.body).toBe('[7]')
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('matches the browser-sync middleware signature', () => {
    type MiddlewareHandler = (
      req: IncomingMessage,
      res: ServerResponse,
      next: () => void,
    ) => void

    // Compile-time contract: browser-sync passes real `http` objects, so the
    // handler has to accept them. `npm run type-check` fails if it does not.
    const accept = (handler: MiddlewareHandler): MiddlewareHandler => handler
    const handler = makeAjax({ apiName: 'mock' })()

    expect(accept(handler)).toBe(handler)
  })
})
