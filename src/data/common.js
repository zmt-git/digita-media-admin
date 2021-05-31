export const deviceAddSteps = Object.freeze([
  { title: '添加设备', icon: 'icon-del' },
  { title: '设置参数', icon: 'icon-peizhi' },
  { title: '设置系统', icon: 'icon-shezhi' },
  { title: '设置播放列表', icon: 'icon-duomeit' }
])
export const jobState = Object.freeze([
  { type: 'error', name: '失败', state: -1 },
  { type: 'success', name: '成功', state: 1 },
  { type: 'primary', name: '执行中', state: -2 },
  { type: 'warning', name: '等待', state: 0 }
])

export const tradeType = Object.freeze([
  { name: '美食餐饮', val: 1 },
  { name: '服装服饰', val: 2 },
  { name: '酒店住宿', val: 3 },
  { name: '美容美发', val: 4 },
  { name: '烟酒便利', val: 5 },
  { name: '鲜果蔬菜', val: 6 },
  { name: '房产中介', val: 7 },
  { name: '汽车服务', val: 8 },
  { name: '教育培训', val: 9 },
  { name: '家居用品', val: 10 },
  { name: '家用电器', val: 11 },
  { name: '银行保险', val: 12 },
  { name: '其他行业', val: 13 }
])

export const mediaType = Object.freeze([
  { type: 'video/mp4', mediaType: 0 },
  { type: 'image/png', mediaType: 2 },
  { type: 'image/jpeg', mediaType: 1 }
])
