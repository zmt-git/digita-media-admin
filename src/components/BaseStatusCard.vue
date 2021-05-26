<template>
  <div class="base-status-card" :class="type">
    <template v-if="!empty">
      <div class="base-status-card-left">
        <i class="iconfont icon" :class="iconClass"></i>
      </div>
      <div class="base-status-card-right">
        <h3>{{title}}</h3>
        <h3>{{number}}</h3>
      </div>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'base-status-card',

  props: {
    empty: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    iconClass: {
      type: String,
      default: 'icon-zx'
    },
    title: {
      type: String,
      default: 'icon-zx'
    },
    number: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.base-status-card{
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  width: calc(16.6% - 10px);
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left{
    display: inline-block;
    width: 50px;
  }
  &-right{
    display: inline-block;
    padding-right: 26px;
    & h3{
      line-height: 35px;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
.icon{
  font-size: 40px;
}
@media screen and (max-width: 1280px) {
  .base-status-card{
    width: calc(33.33% - 10px);
  }
}
@media screen and (max-width: 760px) {
  .base-status-card{
    width: calc(50% - 10px);
  }
}
@media screen and (max-width: 570px) {
  .base-status-card{
    width: calc(100% - 10px);
  }
}
</style>
