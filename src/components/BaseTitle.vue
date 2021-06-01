<template>
  <h3 class="base-title" :class="type">
    <span class="base-title_content"><slot></slot></span>
  </h3>
</template>
<script>
export default {
  name: 'base-title',

  props: {
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return ['success', 'warning', 'error', 'info', 'primary'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.base-title{
  position: relative;
  line-height: 30px;
  &::before{
    content: '';
    display: block;
    width: 5px;
    height: 30px;
    float: left;
    margin-left: 10px;
    margin-right: 10px;
  }
  &_content{
    color: #000000;
  }
}
.success::before{
  @include bg-color('success')
}
.error::before{
  @include bg-color('danger')
}
.warning::before{
  @include bg-color('warning')
}
.info::before{
  @include bg-color('info')
}
.primary::before{
  @include bg-color('primary')
}

</style>
