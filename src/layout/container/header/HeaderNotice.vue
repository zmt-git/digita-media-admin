<!--
 * @Description: 告警信息component
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 09:52:52
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-21 16:37:38
-->
<template>
  <div class="alarm">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">通知({{num}})</el-menu-item>
    </el-menu>
    <ul class="list" v-if="activeIndex === '1'">
      <li class="list-item" v-for="item in list" :key="item.id">
        <div class="list-item-icon">
          <i class="iconfont icon-jurassic_warn"></i>
        </div>
        <div class="list-item-info">
          通知内容
        </div>
      </li>
      <li class="empty" v-if="isEmpty">
        <img src="../../../assets/layout/header/empty.png" alt="空列表">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'header-alarm',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapGetters(['locations']),
    num () {
      return this.list.length
    },

    isEmpty () {
      return this.list.length === 0
    }
  },

  data () {
    return {
      that: this,
      activeIndex: '1'
    }
  },

  methods: {
    handleSelect (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm {
  /deep/.el-menu--horizontal>.el-menu-item{
    height: 40px;
    line-height: 40px;
  }
}
.list{
  min-height: 300px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb{
    background-color: #f0f0f0;
  }
  &::-webkit-scrollbar{
    width: 3px;
  }
  &-item{
    padding: 12px 0;
    border-bottom: 1px solid #d6d5d5;
    &:after{
      display: block;
      content:'';
      clear: both;
      visibility: hidden;
    }
    &-icon{
      width: 32px;
      margin-right: 16px;
      float: left;
      & i {
        font-size: 32px;
        color: #c12121;
      }
    }
    &-info{
      margin-left: 48px;
      box-sizing: border-box;
      padding-right: 5px;
      &_type{
        color: rgba(0,0,0,.85);
        font-size: 14px;
        line-height: 22px
      }
      &_des{
        color: rgba(0,0,0,.45);
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
.empty{
  img {
    width: 100%;
  }
}
</style>
