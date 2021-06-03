<!--
 * @Description: 布局侧边导航栏
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:58:10
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:49:19
-->
<template>
  <el-aside class="aside" :width='width'>
    <router-link class="plate" to="/device/">
      <!-- <span ref="plateImg" style="backgroundPositionY: 0px" class="plate-img" @mouseover="translate(true)" @mouseout="translate(false)"></span> -->
      <span class="plate-img"></span>
      <transition enter-active-class="animate__animated animate__animated" leave-active-class="animate__animated animate__fadeOut"></transition>
      <span v-show="!collapse">数字媒体管理平台</span>
    </router-link>
    <el-menu
      class="el-menu-vertical-demo"
      unique-opened
      background-color="#374c74"
      :collapse='collapse'
      :default-active="defaultActive"
      :text-color="textColor"
      active-text-color="#49befe">
      <template v-for="route in routes">
        <el-submenu v-if="!route.hidden" :key="route.path" :index="route.path">
          <template slot="title">
            <i class="iconfont menu-icon" :class="route.meta.icon ? route.meta.icon : ''"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <template v-if="route.children && route.children.length > 0">
            <template
              v-for="subRoute in route.children"
            >
              <router-link
                v-if="!subRoute.hidden"
                :to='subRoute.path'
                :key="subRoute.path"
              >
                <el-menu-item
                  :index='subRoute.path'
                >
                  <template #title>
                    <i class="iconfont menu-icon" :class="subRoute.meta.icon ? subRoute.meta.icon : ''"></i>
                    <span class="menu-title">{{subRoute.meta.title}}</span>
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout-aside',

  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },

  filters: {
    filterAuth (auth) {
      return auth.include(this.user.userType)
    }
  },

  computed: {
    ...mapGetters(['user', 'routes'])
  },

  data () {
    return {
      width: '200px',
      defaultActive: null,
      textColor: '#ffffff',
      timmer: null
    }
  },

  methods: {
    translate (derective) {
      this.timmer && clearInterval(this.timmer)
      if (derective) {
        let y = 0
        this.$refs.plateImg.style.backgroundPositionY = y + 'px'
        this.timmer = setInterval(() => {
          y = y - 30
          this.$refs.plateImg.style.backgroundPositionY = y + 'px'
          if (y < -600) {
            clearInterval(this.timmer)
            this.$refs.plateImg.style.backgroundPositionY = '-600px'
          }
        }, 30)
      } else {
        let y = -600
        this.$refs.plateImg.style.backgroundPositionY = '-600px'
        this.timmer = setInterval(() => {
          y = y + 30
          this.$refs.plateImg.style.backgroundPositionY = y + 'px'
          if (y > 0) {
            clearInterval(this.timmer)
            this.$refs.plateImg.style.backgroundPositionY = '0px'
          }
        }, 30)
      }
    }
  },

  watch: {
    collapse: {
      handler: function (n, o) {
        if (n) {
          this.width = '70px'
        } else {
          this.width = '200px'
        }
      },
      immediate: true
    },
    $route: {
      handler: function (n, o) {
        this.defaultActive = n.path
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.aside{
  width: 200px;
  @include bg-color('baseBg');
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  /deep/ .el-menu{
    border: 0;
  }
  transition: all .5s ease;
  &::-webkit-scrollbar-thumb{
    background-color: #5d7096;
  }
  &::-webkit-scrollbar{
    width: 3px;
  }
}
.menu-icon{
  margin: 0 5px;
  color: #ffffff;
  font-size: 22px;
}
.plate{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  box-sizing: border-box;
  padding: 0 20px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  display: table-cell;
}
.plate-img{
  width: 25px;
  height: 25px;
  display: inline-block;
  background-size: 100%;
  // background-image: url('../../../assets/layout/aside/plate.png');
  background-image: url('../../../assets/layout/aside/logo.png');
  vertical-align: middle;
  margin: 5px;
}
</style>
