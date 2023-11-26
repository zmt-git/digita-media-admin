<template>
  <div class="device">
    <div class="device-control">
      <base-status-card
        iconClass="icon-zx"
        title="在线"
        :number="statistics.online"
        type="primary"
      ></base-status-card>
      <base-status-card
        iconClass="icon-shebeiyunhang"
        title="工作"
        :number="statistics.onwork"
        type="success"
      ></base-status-card>
      <base-status-card
        iconClass="icon-xiumian"
        title="休眠"
        :number="statistics.sleep"
        type="warning"
      ></base-status-card>
      <base-status-card
        iconClass="icon-jinggao"
        title="报警"
        :number="statistics.alarm"
        type="error"
      ></base-status-card>
      <base-status-card
        iconClass="icon-lx"
        title="离线"
        :number="statistics.offline"
        type="info"
      ></base-status-card>
      <base-status-card :empty="true">
        <div class="add" title="添加设备" @click="addDevice">
          <i class="iconfont icon-jia"></i>
        </div>
      </base-status-card>
    </div>
    <div class="infinite-list-wrapper device-list" style="overflow:auto">
      <ul class="list clear" v-infinite-scroll="pageLoad" infinite-scroll-disabled="scrollDisabled">
        <card-device
          :info="item"
          v-for="item in pageList"
          :key="item.id"
          @setup="setup"
        ></card-device>
      </ul>
      <base-back-top :total="pageTotal" :currentNum="lengthList"></base-back-top>
      <base-page-loading
        :loading="pageLoading"
        :noMore="noMore"
        :list="pageList"
      ></base-page-loading>
    </div>
  </div>
</template>
<script>
import CardDevice from '@/components/CardDevice.vue'
import BaseBackTop from '@/components/BaseBacktop'
import BasePageLoading from '@/components/BasePageLoading.vue'
import BaseStatusCard from '@/components/BaseStatusCard.vue'
import { listDevice, statisticsDevice } from '@/api/device'
import page from '@/mixins/page'
import eventBus from '@/utils/eventBus'

export default {
  name: 'device',

  components: { CardDevice, BaseBackTop, BasePageLoading, BaseStatusCard },

  mixins: [page],

  data() {
    return {
      pageRequest: listDevice,
      statistics: {},
      isAdd: true
    }
  },

  created() {
    this.getStatisticsDevice()

    eventBus.on('devStatus', this.updateStatus)
    eventBus.on('devInfoStatus', this.updateList)

    this.$once('hook:beforeDestroy', () => {
      eventBus.off('devStatus', this.updateStatus)
      eventBus.off('devInfoStatus', this.updateList)
    })
  },

  beforeRouteLeave(to, from, next) {
    if (to.path === '/device/add') {
      to.meta.title = this.isAdd ? '设备添加' : '设备修改'
    }
    next()
  },

  methods: {
    updateStatus(data) {
      this.statistics = JSON.parse(data)
    },
    updateList(list) {
      list.forEach(item => {
        const index = this.pageList.findIndex(el => {
          return el.id === item.id
        })
        if (index >= 0) {
          this.pageList.splice(index, 1, item)
        }
      })
    },
    addDevice() {
      this.isAdd = true
      this.$router.push({ path: '/device/add', query: { isAdd: true } })
    },

    setup(info) {
      this.$router.push({ path: '/device/deviceDetail', query: { id: info.id } })
    },

    getStatisticsDevice() {
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
.device-control {
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-flow: wrap;
  flex-shrink: 0;
}
.device {
  display: flex;
  flex-direction: column;
}
.device-list {
  flex: 1;
}
.add {
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  & i {
    color: #000;
    font-size: 30px;
    line-height: 60px;
  }
}
</style>
