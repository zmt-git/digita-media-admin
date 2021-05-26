<template>
  <div class="loading">
    <el-divider v-if="loading"><i class="el-icon-loading"></i></el-divider>
    <el-divider v-if="noMore">没有更多了</el-divider>
  </div>
</template>

<script>
export default {
  name: 'page-loading',

  props: {
    noMore: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading{
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-divider__text{
    background-color: #f0f2f5;
  }
}
</style>
