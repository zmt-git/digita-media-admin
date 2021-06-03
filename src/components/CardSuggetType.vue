<template>
  <div class="suggest-type" :class="check === value ? 'active' : ''" @click="checked">
    <span v-show="check === value" class="suggest-block"></span>
    <span v-show="check === value" class="iconfont icon-duihao icon"></span>
    <h3 class="suggest-type_title">{{title}}</h3>
    <p class="suggest-type_des ellipsis-3" :title="des">{{des}}</p>
  </div>
</template>

<script>

export default {
  name: 'suggest-type',

  props: {
    title: {
      type: String,
      default: '产品建议'
    },
    des: {
      type: String,
      default: '请输入您对XX智能产品XX功能在XX场景下的改进建议或体验类问题'
    },
    value: {
      type: [String, Number],
      default: 1
    },
    check: {
      type: [String, Number],
      default: ''
    }
  },

  methods: {
    checked () {
      this.$emit('update:check', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.suggest-type{
  width: 100%;
  height: 100px;
  border: 1px solid;
  box-sizing: border-box;
  padding: 5px;
  background-color: #fff;
  @include border-color('info');
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  &_title{
    text-align: center;
    color: #73777a;
    font-size: 13px;
  }
  &_des{
    font-size: 12px;
    color: #afafaf;
    line-height: 16px;
  }
}
.active{
  animation: all .3s;
  @include border-color('primary');
  & h3 {
    @include color('primary');
  }
  & p {
    color: #73777a;
  }
}
.suggest-block{
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  display: block;
  border: 10px solid transparent;
  border-right-color: #409eff;
  border-top-color: #409eff;
}
.icon{
  position: absolute;
  top: 1px;
  right: 0;
  font-size: 12px;
  color: #fff;
  line-height: 12px;
}
</style>
