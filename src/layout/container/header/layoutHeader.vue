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
    <!-- <div class="header-left">
      <el-tooltip :content="leftIconTitle" placement="bottom-start" effect="light">
        <i class="iconfont header-left_nav" :collapse='collapse' @click="changeCollapse" :class="collapseIconClass"></i>
      </el-tooltip>
    </div> -->
    <tag-view></tag-view>
    <div class="header-right">
      <!-- <el-tooltip content="通知" placement="bottom" effect="light">
        <el-popover
          placement="bottom"
          width="360"
          trigger="click">
          <header-notice></header-notice>
          <i slot="reference" class="iconfont header-right_icon icon-tongzhi" @click="notice"></i>
        </el-popover>
      </el-tooltip> -->
      <el-tooltip :content="websocketTitle" placement="bottom" effect="light">
        <i class="iconfont header-right_icon" :class='websocketIcon' @click="toReconnect"></i>
      </el-tooltip>

      <el-tooltip content="我要建议" placement="bottom" effect="light">
        <i class="iconfont header-right_icon icon-bianji" @click="toSuggest"></i>
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
    <header-user-info :userDrawerVisible.sync='userDrawerVisible' :loading.sync='userLoading' :userinfo='user'></header-user-info>
  </el-header>
</template>

<script>
import HeaderUserInfo from './HeaderUserInfo'
// import HeaderNotice from './HeaderNotice'
import { useFullscreen } from '@/hooks/useFullscreen'
import { mapGetters } from 'vuex'
import { reconnectWS } from '@/utils/http/websocket'
import eventBus from '@/utils/eventBus'
import TagView from '../tagView/tagView'
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

  components: { HeaderUserInfo, TagView /* HeaderNotice */ },

  computed: {
    ...mapGetters(['user']),
    leftIconTitle () {
      let title = '导航收起'
      this.collapseIconClass === 'icon-daohangshouqi' ? title = '导航收起' : title = '导航展开'
      return title
    },
    screenTitle () {
      let title = '全屏'
      this.screenIcon === 'icon-fullscreen' ? title = '全屏' : title = '退出全屏'
      return title
    },

    websocketTitle () {
      if (this.websocketStatus === -1) {
        return 'websocket重连中'
      } else if (this.websocketStatus === 1) {
        return 'websocket通信正常'
      } else {
        return 'websocket已断开,点击重连'
      }
    },
    websocketIcon () {
      if (this.websocketStatus === -1) {
        return 'icon-jiazaizhong el-icon-loading'
      } else if (this.websocketStatus === 1) {
        return 'icon-websocket'
      } else {
        return 'icon-bianzu'
      }
    }
  },

  data () {
    return {
      collapseIconClass: 'icon-daohangshouqi', // icon-daohangzhankai
      screenIcon: 'icon-fullscreen',
      isFullscreen: false,
      userDrawerVisible: false,
      userLoading: false,
      websocketStatus: 0
    }
  },

  created () {
    eventBus.on('websocketStatus', (status) => {
      this.websocketStatus = status
    })
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
      await this.$store.dispatch('infoUserActions')
      this.userLoading = false
    },

    toReconnect () {
      if (this.websocketStatus === 0) {
        reconnectWS()
      }
    },

    toSuggest () {
      this.$router.push('/suggestAdd/add')
    },

    logout () {
      this.$confirm('退出当前该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(async () => {
        await this.$store.dispatch('logoutActions')
          .then(res => {
          })
          .catch(e => {
            console.log(e)
          })
        this.$router.push('/login')
        location.reload()
      }).catch(() => {
        console.log('取消退出')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.header{
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    line-height: 50px;
    height: 100%;
  }
  &-left{
    flex-shrink: 0;
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
.icon-jiazaizhong{
  @include color('primary');
}
.icon-websocket{
  @include color('success');
}
.icon-bianzu{
  @include color('danger');
}
</style>
