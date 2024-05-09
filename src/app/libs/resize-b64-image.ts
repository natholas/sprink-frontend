export const resizeB64Image = async (b64: string, maxWidth: number) => {
  return new Promise(resolve => {
    let img = new Image()
    img.onload = () => {
      if (img.naturalWidth <= maxWidth) maxWidth = img.naturalWidth
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = maxWidth
      canvas.height = maxWidth / (img.naturalWidth / img.naturalHeight)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.6))
    }
    img.src = b64
  })
}