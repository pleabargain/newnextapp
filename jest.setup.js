// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Polyfill global Request and Response for Next.js API route tests
import fetch, { Request, Response, Headers } from 'node-fetch'
global.fetch = fetch
// @ts-ignore
if (!global.Request) global.Request = Request
// @ts-ignore
if (!global.Response) global.Response = Response
// @ts-ignore
if (!global.Headers) global.Headers = Headers

// Mock NextResponse for API route tests
const NextResponse = {
  json: (data, options) => new Response(JSON.stringify(data), options),
}

global.NextResponse = NextResponse

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
}) 