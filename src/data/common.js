/*
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-03 20:48:24
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 22:18:55
 */
// 添加设备步骤 已废弃-------------------------------------------------------------------------------------------
export const deviceAddSteps = Object.freeze([
  { title: '添加设备', icon: 'icon-del' },
  { title: '设置参数', icon: 'icon-peizhi' },
  { title: '设置系统', icon: 'icon-shezhi' },
  { title: '设置播放列表', icon: 'icon-duomeit' }
])

// 电话号码 正则-------------------------------------------------------------------------------------------
export const telReg = /^1[3-9]\d{9}$/

// 验证码 正则-------------------------------------------------------------------------------------------
export const codeReg = /^\d{4}$/

// 公司代码 正则-------------------------------------------------------------------------------------------
export const companyCodeReg = /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/

// 身份证 正则-------------------------------------------------------------------------------------------
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 任务状态 -------------------------------------------------------------------------------------------
export const jobState = Object.freeze([
  { type: 'error', name: '失败', state: -1 },
  { type: 'success', name: '成功', state: 1 },
  { type: 'primary', name: '执行中', state: -2 },
  { type: 'warning', name: '等待', state: 0 }
])

// 行业 -------------------------------------------------------------------------------------------
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

// 上传媒体类型 -------------------------------------------------------------------------------------------
export const mediaType = Object.freeze([
  // { type: 'video/mp4', mediaType: 0 },
  { type: 'image/png', mediaType: 2 },
  { type: 'image/jpeg', mediaType: 1 }
])

// 建议类型 -------------------------------------------------------------------------------------------
export const SuggestType = Object.freeze([
  { value: 1, title: '产品建议', des: '请输入您对XX智能产品在XX场景下的改进建议或体验类问题' },
  { value: 2, title: '功能缺陷', des: '请输入您在使用智能产品过程中遇到的阻断或影响正常使用的缺陷类问题' },
  { value: 3, title: '软件BUG', des: '请输入您在使用软件平台或APP过程中遇到的无法正常显示或无法正常控制智能产品等问题' },
  { value: 4, title: '其他', des: '请输入使用智能产品过程中的咨询类问题，如账号、云空间等相关问题' }
])

// 设备类型-------------------------------------------------------------------------------------------
const scenesA = { weatherScenes: [{ type: 'sunny', index: 0 }] }
const scenesRG = { lightScenes: [{ type: 'red', index: 0 }, { type: 'green', index: 1 }] }
const scenesW = { weatherScenes: [{ type: 'sunny', index: 0 }, { type: 'fog', index: 1 }, { type: 'rain-snow', index: 2 }], roadScenes: [{ type: 'construction', index: 3 }, { type: 'trafficAccident', index: 4 }], customizeScenes: [{ type: 'customize1', index: 5 }, { type: 'customize2', index: 6 }] }

export const deviceType = Object.freeze([
  { value: 'ELF-A', label: 'ELF-A', scenes: scenesA },
  { value: 'ELF-T1-W', label: 'ELF-T1-W', scenes: scenesW },
  { value: 'ELF-T1-RG', label: 'ELF-T1-RG', scenes: scenesRG },
  { value: 'ELF-T2-W', label: 'ELF-T2-W', scenes: scenesW },
  { value: 'ELF-T2-RG', label: 'ELF-T2-RG', scenes: scenesRG }
])

// 设备播放方向 -------------------------------------------------------------------------------------------
export const orientOptions = Object.freeze([
  { value: 0, label: '横屏向右' },
  { value: 1, label: '竖屏向上' },
  { value: 8, label: '横屏向左' },
  { value: 9, label: '竖屏向下' }
])

// 设备安装方向 -------------------------------------------------------------------------------------------
export const orient = Object.freeze([
  { value: 0, label: '正向安装' },
  { value: 8, label: '方向安装' }
])

// 切换场景 -------------------------------------------------------------------------------------------
export const scenesOptions = Object.freeze({
  A: [
    { value: 0, label: '默认场景' }
  ],
  RG: [
    { value: 0, label: '红灯' },
    { value: 1, label: '绿灯' }
  ],
  W: [
    { value: 0, label: '默认场景' },
    { value: 1, label: '浓雾天气' },
    { value: 2, label: '雨雪天气' },
    { value: 3, label: '道路施工' },
    { value: 4, label: '交通事故' },
    { value: 5, label: '自定义场景1' },
    { value: 6, label: '自定义场景2' }
  ]
})

// 天气场景-------------------------------------------------------------------------------------------
const weatherScenes = Object.freeze([
  { type: 'sunny', title: '默认场景', des: '适用于一般情况下的播放列表' },
  { type: 'cloudy', title: '多云天气', des: '适用于一般情况下的播放列表' },
  { type: 'shade', title: '阴天天气', des: '适用于一般情况下的播放列表' },
  { type: 'rain', title: '雨天天气', des: '适用于一般情况下的播放列表' },
  { type: 'thundershower', title: '雷阵雨天气', des: '适用于一般情况下的播放列表' },
  { type: 'thundershower-hail', title: '雷阵雨冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'rain-hail', title: '雨加冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'freezing-rain', title: '冻雨天气', des: '适用于一般情况下的播放列表' },
  { type: 'snow', title: '雪天天气', des: '适用于一般情况下的播放列表' },
  { type: 'rain-snow', title: '雨雪天气', des: '适用于雨雪天气下的播放列表' },
  { type: 'fog', title: '浓雾天气', des: '适用于浓雾天气情况下的播放列表' },
  { type: 'heat', title: '高温天气', des: '适用于一般情况下的播放列表' },
  { type: 'cold', title: '低温天气', des: '适用于一般情况下的播放列表' },
  { type: 'gale', title: '大风天气', des: '适用于一般情况下的播放列表' },
  { type: 'hail', title: '冰雹天气', des: '适用于一般情况下的播放列表' },
  { type: 'sandstorm', title: '沙尘暴天气', des: '适用于一般情况下的播放列表' },
  { type: 'haze', title: '雾霾天气', des: '适用于一般情况下的播放列表' },
  { type: 'smoke', title: '浓烟天气', des: '适用于一般情况下的播放列表' },
  { type: 'unknown', title: '未知', des: '适用于一般情况下的播放列表' }
])

// 道路场景-------------------------------------------------------------------------------------------
const roadScenes = Object.freeze([
  { type: 'construction', title: '道路施工', des: '适用于前方道路施工时' },
  { type: 'trafficAccident', title: '交通事故', des: '适用于前方交通事故时' }
])

// 自定义场景-------------------------------------------------------------------------------------------
const customizeScenes = Object.freeze([
  { type: 'customize1', title: '自定义场景1', des: '用户可根据需要自行配置' },
  { type: 'customize2', title: '自定义场景2', des: '用户可根据需要自行配置' }
])

// 交通灯场景-------------------------------------------------------------------------------------------
const lightScenes = Object.freeze([
  { type: 'red', title: '红灯', des: '适用于红灯亮起情况下的播放列表' },
  { type: 'green', title: '绿灯', des: '适用于绿灯亮起情况下的播放列表' }
])

// 场景集合-------------------------------------------------------------------------------------------
export const playlistType = Object.freeze({
  weatherScenes,
  roadScenes,
  customizeScenes,
  lightScenes
})

// 媒体服务器类型-------------------------------------------------------------------------------------------
export const serverType = Object.freeze([
  { value: 1, name: '七牛' },
  { value: 2, name: '阿里云' },
  { value: 3, name: '腾讯云' },
  { value: 4, name: 'Minio' }
])
