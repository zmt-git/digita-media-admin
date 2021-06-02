<!--
 * @Description: 用户信息抽屉
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 09:52:38
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-25 08:29:55
-->
<template>
  <el-drawer
    class="user"
    title="用户信息"
    direction="rtl"
    v-loading="userLoading"
    :size='350'
    :visible="userDrawerVisible"
    :modal-append-to-body='false'
    @open='changeuserDrawerVisible(true)'
    @close='changeuserDrawerVisible(false)'
    >
    <div class="user-content">
      <h3 class="user_title">基础信息</h3>
      <ul class="user-content-info">
        <userinfo-list-item label='用户名' :value='userinfo.username'></userinfo-list-item>
        <userinfo-list-item label='手机号码' :value='userinfo.mobile'></userinfo-list-item>
        <userinfo-list-item label='存储空间' :value='userinfo.storageTotal | filterStorage'></userinfo-list-item>
        <userinfo-list-item label='已使用空间' :value='userinfo.storageUsed | filterStorage'></userinfo-list-item>
        <userinfo-list-item label='用户类型' :value='userinfo.userType | filterUserType'></userinfo-list-item>
        <userinfo-list-item label='账户创建时间' :value='userinfo.timeCreate'></userinfo-list-item>
        <userinfo-list-item label='最后登录时间' :value='userinfo.timeLogin'></userinfo-list-item>
      </ul>

      <h3 class="user_title">修改密码</h3>
      <div class="user-content-info">
        <reset-password></reset-password>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import userinfoListItem from './UserInfoListItem'
import resetPassword from './resetPassword'
import { isType } from '@/utils/tools/typeTool'
export default {
  name: 'header-user-info',

  props: {
    userDrawerVisible: {
      type: Boolean,
      default: false
    },
    userLoading: {
      type: Boolean,
      default: false
    },
    userinfo: {
      type: Object,
      default: () => {}
    }
  },

  filters: {
    filterUserType (val) {
      let type = '用户'
      switch (val) {
        case 0 : type = '个人'
          break
        case 1 : type = '企业'
          break
        case 2 : type = '管理员'
          break
        default : type = '个人'
      }
      return type
    },

    filterStorage (val) {
      if (isType(val, 'Number')) {
        return (val / 1024).toFixed(2) + 'G'
      } else {
        return '0G'
      }
    }
  },

  components: { userinfoListItem, resetPassword },

  data () {
    return {
      noticeAlarm: '1',
      voiceAlarm: '1'
    }
  },

  methods: {
    changeuserDrawerVisible (v) {
      this.$emit('update:userDrawerVisible', v)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.user{
  /deep/ .el-drawer__header{
    width: 100%;
    height: 50px;
    padding: 0 10px;
    margin: 0;
    font-weight: 600;
    box-sizing: border-box;
    color: #fff;
    @include bg-color('baseBg')
  }
  &_title{
    color: #1e90ff;
    font-size: 15px;
    font-weight: 600;
    line-height: 40px;
  }
  &-content{
    padding:0 10px;
    &-info{
      border-bottom: 1px solid #d6d5d5;
    }
  }
}
</style>
