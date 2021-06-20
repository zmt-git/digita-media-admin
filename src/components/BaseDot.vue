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
@import '~@/styles/handler.scss';
$size: 14px;
.base-dot{
  display: inline-block;
  width: $size;
  height: $size;
  margin-left: 2px;
  position: relative;
  &_status {
    display: inline-block;
    width: $size;
    height: $size;
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
  @include bg-color('success')
}
.offline-bg{
  @include bg-color('danger')
}

.standby{
  @include bg-color('info')
}
.standby-bg{
  @include bg-color('info')
}

.online{
  @include border-color('success');
  animation: zoom 1s infinite;
}
.offline{
  @include border-color('danger');
  border: 1px solid;
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
