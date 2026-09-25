import { describe, expect, it } from 'vitest'
import { createLatestRequest } from '../latest-request.js'

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

    await expect(second).resolves.toEqual({ kind: 'success', value: 'mới nhất' })
    await expect(first).resolves.toEqual({ kind: 'ignored' })
  })

  it('bỏ qua request đã huỷ khi màn hình unmount', async () => {
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
