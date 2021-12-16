<!--
 * @Description: 布局脚部
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:58:17
 * @LastEditors: zmt
 * @LastEditTime: 2021-12-06 10:00:22
-->
<template>
  <el-footer class="footer" :height='height'>
    <!-- <span>©{{time}} All Rights Reserved {{company}}</span> -->
    <span> {{company}} </span>
  </el-footer>
</template>

<script>
export default {
  name: 'layout-footer',

  props: {
    height: {
      type: String,
      default: '50'
    }
  },

  data () {
    return {
      time: new Date().getFullYear(),
      company: '云智能交通标志综合管理平台'
    }
  }
}
</script>
<style lang="scss" scoped>
$white: #ffffff;
@import '~@/styles/handler.scss';
.footer{
  height: 50px;
  width: 100%;
  @include bg-color('baseBg');
  line-height: 50px;
  overflow: hidden;
  & span{
    color: $white;
    font-size: 12px;
  }
}
</style>
