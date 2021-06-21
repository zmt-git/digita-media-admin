<template>
  <div class="loading">
    <el-divider v-if="loading"><i class="el-icon-loading"></i></el-divider>
    <el-divider v-if="noMore">{{noMoreaText}}</el-divider>
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
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    noMoreaText () {
      return this.list.length === 0 ? '暂无数据' : 'END'
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
    background-color: #f0f0f0;
  }
}
</style>
