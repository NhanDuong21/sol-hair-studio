import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchHealth } from '../api/health.api.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchHealth', () => {
  it('gọi endpoint health và trả dữ liệu JSON', async () => {
    const payload = {
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

    await expect(fetchHealth('http://localhost:4000/')).resolves.toEqual(payload)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:4000/api/health',
      { signal: expect.any(AbortSignal) },
    )
  })
})
