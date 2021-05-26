<!--
 * @Description: 布局
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:29:05
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-25 11:55:33
-->
<template>
  <el-container class="layout">
    <layout-aside :collapse='collapse'></layout-aside>
    <el-container>
      <el-main class="main">
        <layout-header :collapse.sync="collapse"></layout-header>
        <transition
          appear
          mode="out-in"
          appear-active-class="animate__animated animate__fadeIn"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view class="main-view"></router-view>
        </transition>
        <layout-footer></layout-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from './container/header/layoutHeader'
import layoutFooter from './container/footer/layoutFooter'
import layoutAside from './container/aside/layoutAside'

import { useTheme } from '@/hooks/useTheme'
import { setCollapse, getCollapse } from '@/utils/cache/cacheCollapse'
export default {
  name: 'layout',

  components: { layoutAside, layoutHeader, layoutFooter },

  data () {
    return {
      collapse: false
    }
  },

  async created () {
    const { setThemes } = useTheme()
    setThemes()
    getCollapse() === 'true' ? this.collapse = true : this.collapse = false
  },

  watch: {
    collapse (val, oldVal) {
      if (val) {
        setCollapse(true)
      } else {
        setCollapse(false)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.layout{
  width: 100%;
  height: 100%;
}
.main{
  padding: 0;
  position: relative;
  overflow: hidden;
  &-view{
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    position: absolute;
    top: 50px;
    bottom: 50px;
    box-sizing: border-box;
    padding: 5px;
    background-color: #f0f2f5;
  }
}
</style>
