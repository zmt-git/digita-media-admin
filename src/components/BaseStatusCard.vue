<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-03 21:35:58
-->
<template>
  <div class="base-status-card" :class="type">
    <template v-if="!empty">
      <div class="base-status-card-left" :class="'icon-box-' + type">
        <i class="iconfont icon" :class="iconClass"></i>
      </div>
      <div class="base-status-card-right">
        <h3>{{title}}</h3>
        <h3>{{num}}</h3>
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
  },

  computed: {
    num () {
      return this.number > 9999 ? '9999+' : this.number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
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
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    transition: all 1s;
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
.base-status-card:hover{
  transform: scale(1.01);
}
.base-status-card:hover .icon{
  color: #fff;
}
.icon{
  font-size: 40px;
}
.base-status-card:hover {
  & .icon-box-success{
    @include bg-color('success')
  }
  & .icon-box-primary{
    @include bg-color('primary')
  }
  & .icon-box-info{
    @include bg-color('info')
  }
  & .icon-box-warning{
    @include bg-color('warning')
  }
  & .icon-box-error{
    @include bg-color('danger')
  }
}
@media screen and (max-width: 1050px) {
  .base-status-card{
    width: calc(33.33% - 10px);
  }
}
</style>
