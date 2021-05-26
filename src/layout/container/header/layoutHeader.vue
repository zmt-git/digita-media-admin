<!--
 * @Description: 布局头部
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:58:02
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-28 14:06:04
-->
<template>
  <el-header class="header" :height='height'>
    <div class="header-left">
      <el-tooltip :content="leftIconTitle" placement="bottom-start" effect="light">
        <i class="iconfont header-left_nav" :collapse='collapse' @click="changeCollapse" :class="collapseIconClass"></i>
      </el-tooltip>
    </div>
    <div class="header-right">
      <el-tooltip content="通知" placement="bottom" effect="light">
        <el-popover
          placement="bottom"
          width="360"
          trigger="click">
          <header-notice></header-notice>
          <i slot="reference" class="iconfont header-right_icon icon-tongzhi" @click="notice"></i>
        </el-popover>
      </el-tooltip>

      <el-tooltip :content="screenTitle" placement="bottom" effect="light">
        <i class="iconfont header-right_icon" :class="screenIcon" @click="toggleScreen"></i>
      </el-tooltip>

      <el-tooltip content="用户信息" placement="bottom" effect="light">
        <i class="iconfont header-right_icon icon-denglu1" @click="viewUserInfo"></i>
      </el-tooltip>

      <el-tooltip content="退出程序" placement="bottom" effect="light">
        <i class="iconfont header-right_icon icon-tuichu" @click="logout"></i>
      </el-tooltip>
    </div>
    <header-user-info :userDrawerVisible.sync='userDrawerVisible' :loading.sync='userLoading' :userinfo='userinfo'></header-user-info>
  </el-header>
</template>

<script>
import HeaderUserInfo from './HeaderUserInfo'
import HeaderNotice from './HeaderNotice'
import { useFullscreen } from '@/hooks/useFullscreen'
const { toggleFullscreen, isFullscreen } = useFullscreen()
export default {
  name: 'layout-header',

  props: {
    height: {
      type: String,
      default: '50'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'collapse',
    event: 'change'
  },

  components: { HeaderUserInfo, HeaderNotice },

  computed: {
    leftIconTitle () {
      let title = '导航收起'
      this.collapseIconClass === 'icon-daohangshouqi' ? title = '导航收起' : title = '导航展开'
      return title
    },
    screenTitle () {
      let title = '全屏'
      this.screenIcon === 'icon-fullscreen' ? title = '全屏' : title = '退出全屏'
      return title
    }
  },

  data () {
    return {
      collapseIconClass: 'icon-daohangshouqi', // icon-daohangzhankai
      screenIcon: 'icon-fullscreen',
      isFullscreen: false,
      userDrawerVisible: false,
      userinfo: {},
      userLoading: false
    }
  },

  created () {
    this.collapse ? this.collapseIconClass = 'icon-daohangzhankai' : this.collapseIconClass = 'icon-daohangshouqi'
  },

  mounted () {
    window.addEventListener('resize', this.setFullscreenStatus)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.setFullscreenStatus)
    })
  },

  methods: {
    changeCollapse () {
      if (this.collapseIconClass === 'icon-daohangzhankai') {
        this.collapseIconClass = 'icon-daohangshouqi'
        this.$emit('update:collapse', false)
      } else {
        this.collapseIconClass = 'icon-daohangzhankai'
        this.$emit('update:collapse', true)
      }
    },

    notice () {

    },

    toggleScreen () {
      toggleFullscreen()
    },

    setFullscreenStatus () {
      isFullscreen() ? this.screenIcon = 'icon-tuichuquanping' : this.screenIcon = 'icon-fullscreen'
    },

    async viewUserInfo () {
      this.userDrawerVisible = true
      this.userLoading = true
      this.userLoading = false
    },

    logout () {
      this.$confirm('退出当前该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        this.$store.dispatch('logoutActions')
          .then(res => {
            this.$router.push('/login')
            location.reload()
          })
          .catch(e => {
            console.log(e)
          })
      }).catch(() => {
        console.log('取消退出')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  border-bottom: 1px solid #d6d5d5;
  padding: 0 10px;
  z-index: 10;
  & div {
    line-height: 50px;
    height: 100%;
  }
  &-left{
    float: left;
    &_nav{
      font-size: 22px;
      cursor: pointer;
    }
  }
  &-right{
    float: right;
    &_icon{
      color: #000;
      margin: 0 5px;
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>