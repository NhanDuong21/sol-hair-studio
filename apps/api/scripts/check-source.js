import { spawnSync } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const sourceDirectory = path.resolve('src')

async function findJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await findJavaScriptFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(entryPath)
    }
  }

  return files
}

const sourceFiles = (await findJavaScriptFiles(sourceDirectory)).sort()

if (sourceFiles.length === 0) {
  throw new Error('Không tìm thấy file JavaScript trong source API.')
}

for (const sourceFile of sourceFiles) {
  const result = spawnSync(process.execPath, ['--check', sourceFile], {
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(
  'Đã kiểm tra cú pháp ' + sourceFiles.length + ' file JavaScript API.',
)
