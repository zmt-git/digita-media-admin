export const deviceAddSteps = Object.freeze([
  { title: '添加设备', icon: 'icon-del' },
  { title: '设置参数', icon: 'icon-peizhi' },
  { title: '设置系统', icon: 'icon-shezhi' },
  { title: '设置播放列表', icon: 'icon-duomeit' }
])

export const telReg = /^1[3-9]\d{9}$/
export const codeReg = /^\d{4}$/
export const companyCodeReg = /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

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

export const SuggestType = Object.freeze([
  { value: 1, title: '产品建议', des: '请输入您对XX智能产品在XX场景下的改进建议或体验类问题' },
  { value: 2, title: '功能缺陷', des: '请输入您在使用智能产品过程中遇到的阻断或影响正常使用的缺陷类问题' },
  { value: 3, title: '软件BUG', des: '请输入您在使用软件平台或APP过程中遇到的无法正常显示或无法正常控制智能产品等问题' },
  { value: 4, title: '其他', des: '请输入使用智能产品过程中的咨询类问题，如账号、云空间等相关问题' }
])
