<template>
  <div class="suggest table">
    <el-table
      v-loading='loading_PT'
      :data="pageList_PT"
      border
      tooltip-effect="dark"
      style="width: 100%"
      size='mini'
      header-cell-class-name='head-style'>
      <el-table-column
        prop="type"
        show-overflow-tooltip
        label="建议类型">
      </el-table-column>
      <el-table-column
        prop="title"
        show-overflow-tooltip
        label="标题">
      </el-table-column>
      <el-table-column
        prop="product"
        show-overflow-tooltip
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="des"
        show-overflow-tooltip
        label="问题描述">
      </el-table-column>
      <el-table-column
        prop="timeReport"
        show-overflow-tooltip
        label="上报时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="onChangeLimit"
      @current-change="onChangePage"
      :current-page="page_PT"
      :page-sizes="pageSizes_PT"
      :page-size="limit_PT"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal_PT">
    </el-pagination>
  </div>
</template>
<script>
import { listSuggest } from '@/api/suggest'
import pageTable from '@/mixins/pageTable'
export default {
  name: 'user',

  mixins: [pageTable],

  data () {
    return {
      pageRequest_PT: listSuggest
    }
  },

  methods: {
    dataProcessing (list) {
      return list.map(item => {
        const arr = item.content.split('&amp;')
        if (arr.length === 1) {
          item.type = ''
          item.title = ''
          item.product = ''
          item.des = item.content
        } else {
          item.type = arr[0]
          item.title = arr[1]
          item.product = arr[2]
          item.des = arr[3]
        }
        return item
      })
    }
  }
}
</script>
