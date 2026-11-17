// Mock Ajax API middleware for browser-sync 2.x.
// Doc: https://browsersync.io/docs/options#option-middleware

export interface MockAjaxOptions {
  apiName: string
  data?: unknown
  timeout?: number
}

export type MockAjaxChunk = string | Uint8Array

export interface MockAjaxRequest {
  // `http.IncomingHttpHeaders` allows repeated headers, so both shapes are
  // accepted: browser-sync hands over a real `http.IncomingMessage`.
  headers: Record<string, string | string[] | undefined>
  // Optional on purpose: `http.IncomingMessage` declares both as optional, and
  // `originalUrl` is only added by express-like frameworks, not by browser-sync.
  method?: string
  originalUrl?: string
  url?: string
  connection?: {
    remoteAddress?: string
    socket?: { remoteAddress?: string }
  }
  socket?: { remoteAddress?: string }
  on: (event: 'data' | 'err', listener: (payload: MockAjaxChunk) => void) => void
}

export interface MockAjaxResponse {
  setHeader: (name: string, value: string) => void
  end: (body: string) => void
}

export type MockAjaxNext = () => void

function makeAjax({
  apiName,
  data = null,
  timeout = 200,
}: MockAjaxOptions) {
  return () => {
    const apiNameWithBrackets = `[${apiName}]`

    return (req: MockAjaxRequest, res: MockAjaxResponse, next: MockAjaxNext): void => {
      const forwardedFor = req.headers['x-forwarded-for']
      const remoteAddress = (Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor)
      || req.connection?.remoteAddress
      || req.socket?.remoteAddress
      || req.connection?.socket?.remoteAddress
      || ''
      const method = req.method ?? ''
      // `originalUrl` is express-only: browser-sync request objects carry the
      // path on `url` instead.
      const requestUrl = req.originalUrl ?? req.url ?? ''

      // Set Header
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'application/json;charset=UTF-8')

      if (method === 'GET') {
        console.log(
          `${apiNameWithBrackets} Receive a require\n`
          + `${apiNameWithBrackets} -----------------\n`
          + `${apiNameWithBrackets} Method: ${method}\n`
          + `${apiNameWithBrackets} RemoteAddress: ${remoteAddress}\n`
          + `${apiNameWithBrackets} Query: ${requestUrl.replace(/.+\?/, '')}\n`,
        )

        setTimeout(() => {
          res.end(JSON.stringify(data))
          next()
        }, timeout)
      }

      // Receive the browser data
      req.on('data', (e) => {
        console.log(
          `${apiNameWithBrackets} Receive a require\n`
          + `${apiNameWithBrackets} -----------------\n`
          + `${apiNameWithBrackets} Method: ${method}\n`
          + `${apiNameWithBrackets} RemoteAddress: ${remoteAddress}\n`
          + `${apiNameWithBrackets} Data: ${String(e)}\n`,
        )

        setTimeout(() => {
          res.end(JSON.stringify(data))
          next()
        }, timeout)
      })

      req.on('err', (err) => {
        console.log(
          `${apiNameWithBrackets} Error: ${String(err)}\n`,
        )

        res.end(`Error:${String(err)}`)
        next()
      })
    }
  }
}

export default makeAjax
