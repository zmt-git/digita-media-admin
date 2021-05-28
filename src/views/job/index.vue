<template>
  <div class="job" v-loading='pageLoading'>
    <el-button-group class="btn-box">
      <el-button type="danger" @click="clean" size="mini">清空任务</el-button>
    </el-button-group>
    <div class="infinite-list" v-infinite-scroll="pageLoad" :infinite-scroll-disabled="scrollDisabled" style="overflow:auto">
      <el-timeline>
        <el-timeline-item :timestamp="item.timeCreate" placement="top" v-for="item in pageList" :key="item.id" >
          <card-task
            :title="item.jobContent | filterName"
            :type="item.jobState | type"
          >
            <div>
              <p class="card-item">任务内容：{{item.jobContent | filterContent}}</p>
              <p class="card-item">执行时间：{{item.timeFinish}}</p>
              <p class="card-item">任务状态：{{item.jobState | filterState}}</p>
            </div>
          </card-task>
        </el-timeline-item>
      </el-timeline>
      <base-page-loading :loading='pageLoading' :noMore='noMore'></base-page-loading>
    </div>
  </div>
</template>

<script>
import BasePageLoading from '@/components/BasePageLoading.vue'

import { jobState } from '@/data/common'
import { listJob, cleanJob } from '@/api/job'
import CardTask from '@/components/CardTask'
import page from '@/mixins/page'
export default {
  name: 'job',

  components: { CardTask, BasePageLoading },

  mixins: [page],

  filters: {
    filterName (val) {
      return val.split('&').shift()
    },
    filterContent (val) {
      return val.split('&').pop()
    },
    filterState (val) {
      const obj = jobState.find(item => item.state === val)
      return obj.name
    },
    type (val) {
      const obj = jobState.find(item => item.state === val)
      return obj.type
    }
  },

  data () {
    return {
      pageRequest: listJob
    }
  },

  methods: {
    setLoading (state = true) {
      this.loading = state
    },

    async clean () {
      this.setLoading()
      await cleanJob()
        .then(res => {

        })
        .catch(e => console.log(e))
      this.setLoading(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.card-item{
  line-height: 25px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 25px;
}
.job{
  background-color: #fff;
}
.btn-box{
  margin-bottom: 10px;
}
</style>
