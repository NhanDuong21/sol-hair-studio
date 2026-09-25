import { afterEach, describe, expect, it, vi } from 'vitest'
import { normalizeBaseUrl, requestJson } from '../http.js'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('normalizeBaseUrl', () => {
  it('xóa khoảng trắng và dấu gạch chéo ở cuối URL', () => {
    expect(normalizeBaseUrl(' http://10.0.2.2:4000/// ')).toBe(
      'http://10.0.2.2:4000',
    )
  })
})

describe('requestJson', () => {
  it('báo lỗi khi HTTP response không thành công', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))

    await expect(
      requestJson('/api/example', { baseUrl: 'http://10.0.2.2:4000' }),
    ).rejects.toThrow('HTTP 503')
  })

  it('chuyển timeout thành lỗi có thể thử lại', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn((_url, { signal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            const error = new Error('aborted')
            error.name = 'AbortError'
            reject(error)
          })
        }),
      ),
    )

    const pending = requestJson('/api/example', {
      baseUrl: 'http://10.0.2.2:4000',
      timeoutMs: 100,
    })
    const assertion = expect(pending).rejects.toThrow('đã hết thời gian chờ')
    await vi.advanceTimersByTimeAsync(100)
    await assertion
  })

  it('dọn timer khi request hoàn tất', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 })),
    )

    await expect(
      requestJson('/api/example', { baseUrl: 'http://10.0.2.2:4000' }),
    ).resolves.toEqual({ ok: true })
    expect(vi.getTimerCount()).toBe(0)
  })
})
