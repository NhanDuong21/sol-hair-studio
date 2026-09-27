export function cloudinaryImageUrl(cloudName, publicId) {
  if (!cloudName || !publicId) {
    throw new Error('Cần cấu hình Cloudinary cloud name và public ID của ảnh.')
  }

  const normalizedPublicId = publicId
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/')

  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/f_auto,q_auto/${normalizedPublicId}`
}
