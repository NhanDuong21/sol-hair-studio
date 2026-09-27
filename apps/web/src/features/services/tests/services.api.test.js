import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchServices } from '../api/services.api.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchServices', () => {
  it('gọi endpoint danh mục dịch vụ và trả danh sách', async () => {
    const services = [{ id: 'service-cut-style', name: 'Cắt & tạo kiểu' }]
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: services }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchServices('http://localhost:4000/')).resolves.toEqual(
      services,
    )
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:4000/api/services',
      { signal: expect.any(AbortSignal) },
    )
  })
})
