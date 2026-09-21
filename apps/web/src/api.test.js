import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createLatestRequest,
  fetchHealth,
  normalizeBaseUrl,
} from './api'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('normalizeBaseUrl', () => {
  it('xóa khoảng trắng và dấu gạch chéo ở cuối URL', () => {
    expect(normalizeBaseUrl(' http://localhost:4000/// ')).toBe(
      'http://localhost:4000',
    )
  })
})

describe('fetchHealth', () => {
  it('gọi đúng health endpoint dùng chung', async () => {
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

  it('chuyển timeout thành lỗi có thể thử lại', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn((_url, { signal }) => {
        return new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            const error = new Error('aborted')
            error.name = 'AbortError'
            reject(error)
          })
        })
      }),
    )

    const pending = fetchHealth('http://localhost:4000', { timeoutMs: 100 })
    const assertion = expect(pending).rejects.toThrow('đã hết thời gian chờ')
    await vi.advanceTimersByTimeAsync(100)

    await assertion
  })
})

describe('createLatestRequest', () => {
  it('bỏ qua request cũ khi request mới bắt đầu', async () => {
    const manager = createLatestRequest()
    const first = manager.run(
      (signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            const error = new Error('aborted')
            error.name = 'AbortError'
            reject(error)
          })
        }),
    )
    const second = manager.run(async () => 'mới nhất')

    await expect(second).resolves.toEqual({
      kind: 'success',
      value: 'mới nhất',
    })
    await expect(first).resolves.toEqual({ kind: 'ignored' })
  })

  it('bỏ qua kết quả sau khi component huỷ request', async () => {
    const manager = createLatestRequest()
    const pending = manager.run(
      (signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => {
            const error = new Error('aborted')
            error.name = 'AbortError'
            reject(error)
          })
        }),
    )

    manager.cancel()

    await expect(pending).resolves.toEqual({ kind: 'ignored' })
  })
})
