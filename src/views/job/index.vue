<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-28 19:38:15
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-02 21:59:58
-->
<template>
  <div class="job" v-loading="pageLoading">
    <!-- <el-button-group class="btn-box">
      <el-button type="danger" @click="clean" size="mini">清空任务</el-button>
    </el-button-group> -->
    <div class="infinite-list-wrapper job-list" style="overflow:auto">
      <ul class="list" v-infinite-scroll="pageLoad" :infinite-scroll-disabled="scrollDisabled">
        <el-timeline>
          <el-timeline-item
            :timestamp="item.timeCreate"
            placement="top"
            v-for="item in pageList"
            :key="item.id"
          >
            <card-task :info="item"></card-task>
          </el-timeline-item>
        </el-timeline>
      </ul>
      <base-page-loading
        :loading="pageLoading"
        :noMore="noMore"
        :list="pageList"
      ></base-page-loading>
    </div>
  </div>
</template>

<script>
import BasePageLoading from '@/components/BasePageLoading.vue'
import { listJob, cleanJob } from '@/api/job'
import { infoDevice } from '@/api/device'

import CardTask from '@/components/CardTask'
import page from '@/mixins/page'
import eventBus from '@/utils/eventBus'
export default {
  name: 'job',

  components: { CardTask, BasePageLoading },

  mixins: [page],

  data() {
    return {
      pageRequest: listJob
    }
  },

  created() {
    eventBus.on('taskList', this.updateList)
    this.$once('hook:beforeDestroy', () => {
      eventBus.off('taskList', this.updateList)
    })
  },

  methods: {
    updateList(list) {
      list.forEach(item => {
        const index = this.pageList.findIndex(el => {
          return el.id === item.id
        })
        if (index >= 0) {
          const obj = Object.assign(this.pageList[index], item)
          this.pageList.splice(index, 1, obj)
        }
      })
    },
    async clean() {
      await cleanJob()
        .then(() => {
          this.$message({ type: 'success', message: '清空任务成功' })
          this.refresh()
        })
        .catch(e => console.log(e))
    },

    async beforeAssignPageList(list) {
      let deviceIds = []

      list.forEach(item => {
        deviceIds.push(item.deviceId)
        item.deviceInfo = { location: '', name: '' }
      })

      deviceIds = Array.from(new Set(deviceIds))

      deviceIds.forEach(id => {
        this.getDeviceInfo(id, list)
      })
    },

    getDeviceInfo(deviceId, list) {
      return infoDevice(deviceId)
        .then(res => {
          if (!res.data) return
          list.forEach(item => {
            if (item.deviceId === deviceId) {
              item.deviceInfo = res.data
            }
          })
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
<style lang="scss" scoped>
.job {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  &-list {
    flex: 1;
    /deep/ .el-divider__text {
      background-color: #fff !important;
    }
    /deep/ .el-timeline-item__content {
      // border-radius: 4px;
      overflow: hidden;
    }
  }
}
.btn-box {
  margin-bottom: 10px;
}
</style>
