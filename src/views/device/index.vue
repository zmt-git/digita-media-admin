<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 21:38:15
-->
<template>
<div class="device">
  <div class="device-control">
    <base-status-card iconClass='icon-zx' title="在线" :number='statistics.online' type='primary'></base-status-card>
    <base-status-card iconClass='icon-shebeiyunhang' title="工作" :number='statistics.onwork' type='success'></base-status-card>
    <base-status-card iconClass='icon-xiumian' title="休眠" :number='statistics.sleep' type='warning'></base-status-card>
    <base-status-card iconClass='icon-jinggao' title="报警" :number='statistics.alarm' type='error'></base-status-card>
    <base-status-card iconClass='icon-lx' title="离线" :number='statistics.offline' type='info'></base-status-card>
    <base-status-card :empty='true'>
      <div class="add" title="添加设备" @click="addDevice">
        <i class="iconfont icon-add-fill"></i>
      </div>
    </base-status-card>
  </div>
  <div class="infinite-list-wrapper device-list" style="overflow:auto">
    <ul
      class="list clear"
      v-infinite-scroll="pageLoad"
      infinite-scroll-disabled='scrollDisabled'
    >
      <card-device :info='item' v-for="item in pageList" :key='item.id' @setup='setup'></card-device>
    </ul>
    <base-backtop :total='pageTotal' :currentNum='lengthList'></base-backtop>
    <base-page-loading :loading='pageLoading' :noMore='noMore'></base-page-loading>
  </div>
</div>
</template>
<script>
import CardDevice from '@/components/CardDevice.vue'
import BaseBacktop from '@/components/BaseBacktop'
import BasePageLoading from '@/components/BasePageLoading.vue'
import BaseStatusCard from '@/components/BaseStatusCard.vue'
import { listDevice, statisticsDevice } from '@/api/device'
import page from '@/mixins/page'
export default {
  name: 'device',

  components: { CardDevice, BaseBacktop, BasePageLoading, BaseStatusCard },

  mixins: [page],

  data () {
    return {
      pageRequest: listDevice,
      statistics: {}
    }
  },

  created () {
    this.getStatisticsDevice()
  },

  methods: {
    addDevice () {
      this.$router.push('/device/add')
    },

    setup (info) {
      if (info.stateOnline !== 1) {
        this.$message({
          type: 'error',
          message: '智能终端离线，无法进行操作！'
        })
        return
      }
      this.$router.push({ path: '/device/detail', query: { id: info.id } })
    },

    getStatisticsDevice () {
      return statisticsDevice()
        .then(res => {
          this.statistics = JSON.parse(res.data)
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
.device{
  display: flex;
  flex-direction: column;
}
.device-control{
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
}
.device-list{
  flex: 1;
}
.add{
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  & i{
    font-size: 50px;
    line-height: 60px;
  }
}
</style>
