import defaultSettings from '@/settings'

const title = defaultSettings.title || '云智能交通标记综合管理平台'

export function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
