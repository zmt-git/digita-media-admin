<template>
  <el-backtop :target="target" :bottom="bottom">
    <div class="base-backtop-info">
      <i class="iconfont icon-up base-backtop-info_icon"></i>
      <span class="base-backtop-info_text">{{currentNum}}/{{total}}</span>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: 'base-backtop',
  props: {
    bottom: {
      type: Number,
      default: 100
    },
    target: {
      type: String,
      default: '.infinite-list-wrapper'
    },
    total: {
      type: Number,
      default: 0
    },
    currentNum: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.base-backtop-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &_icon{
    font-size: 20px;
  }
  &_text{
    font-size: 12px;
  }
}
</style>
