<template>
  <div class="card-task" :class="type">
    <h3 class="card-task-title">
      <i class="iconfont card-task-title_icon" :class="iconClass"></i>
      <span class="card-task-title_text">{{title}}</span>
    </h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card-task',

  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.card-task{
  width: 100%;
  box-sizing: border-box;
  padding: 8px 16px;
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
.info{
  @include bg-color('info-plain');
  @include color('info');
}
.error{
  @include bg-color('danger-plain');
  @include color('danger');
}
.primary{
  @include bg-color('primary-plain');
  @include color('primary');
}
.success{
  @include bg-color('success-plain');
  @include color('success');
}
.warning{
  @include bg-color('warning-plain');
  @include color('warning');
}
</style>
