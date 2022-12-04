export function getVideoDuration (file, cb) {
  const video = document.createElement('video')
  video.src = URL.createObjectURL(file)
  video.addEventListener('loadedmetadata', () => {
    cb(video)
    video.remove()
  })
}

export function getImageInfo (file) {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = function ()  {
    const img = new Image()

    img.src = this.result
    
    console.log(img.width, img.height)
  }
}