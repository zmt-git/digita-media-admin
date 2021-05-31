export function getVideoDuration (file, cb) {
  const video = document.createElement('video')
  video.src = URL.createObjectURL(file)
  video.addEventListener('loadedmetadata', () => {
    cb(video)
    video.remove()
  })
}
