<template>
  <div class="card-task" :class="type">
    <!-- <h3 class="card-task-title">
      <i class="iconfont card-task-title_icon" :class="iconClass"></i>
      <span class="card-task-title_text">{{title}}</span>
    </h3> -->
    <p class="card-item">任务内容：{{jobContent}}</p>
    <p class="card-item">任务主体：{{content}}</p>
    <p class="card-item">执行时间：{{timeFinish}}</p>
    <p class="card-item">任务状态：{{jobState}}</p>
  </div>
</template>

<script>
import { jobState } from '@/data/common'
export default {
  name: 'card-task',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    deviceInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    iconClass () {
      let iconClass
      switch (this.type) {
        case 'success' : iconClass = 'icon-chenggong2'
          break
        case 'error' : iconClass = 'icon-shibai'
          break
        case 'primary' : iconClass = 'icon-zhihangzhong'
          break
        case 'info' : iconClass = 'icon-tanhao'
          break
        case 'warning' : iconClass = 'icon-dengdai'
          break
        default: iconClass = 'icon-chenggong2'
      }

      return iconClass
    },
    jobContent () {
      return this.info.jobContent ? `【${this.info.jobContent}】` : ''
    },
    timeFinish () {
      return this.info.timeFinish ? `【${this.info.timeFinish}】` : ''
    },
    jobState () {
      const obj = jobState.find(item => item.state === this.info.jobState)
      return obj ? `【${obj.name}】` : ''
    },
    type () {
      const obj = jobState.find(item => item.state === this.info.jobState)
      return obj.type
    },
    content () {
      if (this.info.deviceInfo.location && this.info.deviceInfo.name) {
        return `【${this.info.deviceInfo.location}】-【${this.info.deviceInfo.name}】`
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.card-task{
  width: 100%;
  box-sizing: border-box;
  padding: 16px 14px;
  color: #fff;
  &-title{
    &_icon{
      margin-right: 10px;
    }
    &_text{
      font-size: 14px;
      line-height: 18px;
      font-weight: 700;
    }
  }
  &-text{
    font-size: 12px;
    line-height: 16px;
  }
}
.card-item{
  line-height: 25px;
  font-size: 12px;
  box-sizing: border-box;
}
.error{
  background-color: #cc0001;
}
.primary{
  background-color: #0043b4;
}
.success{
  background-color: #009900;
}
</style>
