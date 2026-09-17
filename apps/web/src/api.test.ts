import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchHealth, normalizeBaseUrl, type HealthPayload } from './api'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('normalizeBaseUrl', () => {
  it('trims whitespace and trailing slashes', () => {
    expect(normalizeBaseUrl(' http://localhost:4000/// ')).toBe(
      'http://localhost:4000',
    )
  })
})

describe('fetchHealth', () => {
  it('requests the shared health endpoint', async () => {
    const payload: HealthPayload = {
      status: 'ok',
      service: 'sol-hair-api',
      database: 'not-configured',
      timestamp: '2026-09-18T00:00:00.000Z',
    }
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchHealth('http://localhost:4000/')).resolves.toEqual(
      payload,
    )
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:4000/api/health',
      { signal: undefined },
    )
  })
})
