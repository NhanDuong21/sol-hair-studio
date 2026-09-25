function isInvalidJsonError(error) {
  return (
    error instanceof SyntaxError &&
    error.status === 400 &&
    error.type === 'entity.parse.failed'
  )
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }

  if (isInvalidJsonError(error)) {
    return response.status(400).json({
      status: 'error',
      code: 'INVALID_JSON',
      message: 'Dữ liệu JSON không hợp lệ.',
    })
  }

  console.error('Lỗi nội bộ khi xử lý yêu cầu.', {
    method: request.method,
    path: request.path,
    name: error instanceof Error ? error.name : 'UnknownError',
  })

  return response.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'Máy chủ gặp lỗi. Vui lòng thử lại sau.',
  })
}
