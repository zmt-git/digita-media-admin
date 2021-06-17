<!--
 * @Description: 布局脚部
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:58:17
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-24 11:57:01
-->
<template>
  <el-footer class="footer" :height='height'>
    <span>©{{time}} All Rights Reserved {{company}}</span>
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
      time: '2021',
      company: '西安启明荣光科技有限公司'
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
