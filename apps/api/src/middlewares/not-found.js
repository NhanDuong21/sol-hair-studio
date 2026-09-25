export function notFound(_request, response) {
  response.status(404).json({
    status: 'error',
    code: 'NOT_FOUND',
    message: 'Không tìm thấy đường dẫn.',
  })
}
