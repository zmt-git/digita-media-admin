export function useFullscreen (target = document.documentElement, options) {
  let isFullscreenRef = false
  const el = document.documentElement
  let RFC_METHOD_NAME = 'requestFullscreen'
  let EFS_METHOD_NAME = 'exitFullscreen'
  let FSE_PROP_NAME = 'fullscreenElement'

  if ('webkitRequestFullScreen' in el) {
    RFC_METHOD_NAME = 'webkitRequestFullScreen'
    EFS_METHOD_NAME = 'webkitExitFullscreen'
    FSE_PROP_NAME = 'webkitFullscreenElement'
  } else if ('msRequestFullscreen' in el) {
    RFC_METHOD_NAME = 'msRequestFullscreen'
    EFS_METHOD_NAME = 'msExitFullscreen'
    FSE_PROP_NAME = 'msFullscreenElement'
  } else if ('mozRequestFullScreen' in el) {
    RFC_METHOD_NAME = 'mozRequestFullScreen'
    EFS_METHOD_NAME = 'mozCancelFullScreen'
    FSE_PROP_NAME = 'mozFullScreenElement'
  } else if (!('requestFullscreen' in el)) {
    throw new Error('当前浏览器不支持Fullscreen API !')
  }

  function enterFullscreen () {
    isFullscreenRef = true
    return target[RFC_METHOD_NAME](options)
  }

  function exitFullscreen () {
    isFullscreenRef = false
    return document[EFS_METHOD_NAME]()
  }

  function isFullscreen () {
    return target === document[FSE_PROP_NAME]
  }

  function toggleFullscreen () {
    if (isFullscreen()) {
      return exitFullscreen()
    } else {
      return enterFullscreen()
    }
  }

  return {
    toggleFullscreen,
    exitFullscreen,
    isFullscreen,
    enterFullscreen,
    isFullscreenRef
  }
}
