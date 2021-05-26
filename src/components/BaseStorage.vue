<template>
  <div class="base-storage" :title="title">
    <span class="base-storage_name">空间</span>
    <div class="progress-box">
      <el-progress :show-text='false' :percentage="percentage" :color="color"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-storage',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    fillColor: {
      type: String,
      default: '#f56c6c'
    },
    normalColor: {
      type: String,
      default: '#409eff'
    }
  },

  computed: {
    storageTotal () {
      return this.info.storageTotal ? this.info.storageTotal : 0
    },
    storageUsable () {
      return this.info.storageUsable ? this.info.storageUsable : 0
    },
    percentage () {
      const num = parseInt((this.info.storageUsable / this.info.storageTotal) * 100)
      return num || 0
    },
    color () {
      return this.info.alarm && this.info.alarm.includes('2002') ? this.fillColor : this.normalColor
    },
    title () {
      return this.info.alarm && this.info.alarm.includes('2002') ? '存储将满' : `存储空间(${(this.info.storageUsable)}MB / ${this.info.storageTotal}MB)`
    }
  }
}
</script>

<style lang="scss" scoped>
.base-storage{
  width: 100%;
  display: flex;
  align-items: center;
  &_name{
    margin-right: 10px;
    font-size: 12px;
    color: #999999;
  }
}
.progress-box{
  flex: 1;
}
</style>
