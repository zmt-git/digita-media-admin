<template>
  <span class="base-dot" :title='title'>
    <span v-show="ripple" class="base-dot_status outer_status" :class="borderClass">
    </span>
    <span class="base-dot_status" :class="bgClass"></span>
  </span>
</template>
<script>
export default {
  name: 'base-dot',

  props: {
    title: {
      type: String,
      defaule: ''
    },
    ripple: {
      type: Boolean,
      default: false
    },
    borderClass: {
      type: String,
      default: 'offline'
    },
    bgClass: {
      type: String,
      defaule: 'offline-bg'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-dot{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 2px;
  position: relative;
  &_status {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    right: 0px;
    border: 1px solid transparent;
  }
}
.outer_status{
  border: 1px solid transparent;
  background-color: transparent;
}
.online-bg{
  background-color: #67c23a;
}
.offline-bg{
  background-color: #909399;
}
.online{
  border-color: #67c23a;
  animation: zoom 1s infinite;
}
.offline{
  border-color: #909399;
  border: 1px solid #909399;
}
@keyframes zoom {
  0% { transform: scale(1); }
  10% { transform: scale(1.1); }
  20% { transform: scale(1.2); }
  30% { transform: scale(1.3); }
  40% { transform: scale(1.4); }
  50% { transform: scale(1.5); }
  60% { transform: scale(1.4); }
  70% { transform: scale(1.3); }
  80% { transform: scale(1.2); }
  90% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
