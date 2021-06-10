export default {
  data () {
    return {
      loading_PT: false,
      page_PT: 1,
      limit_PT: 15,
      params_PT: {
        page: 1,
        limit: 15
      },
      pageSizes_PT: [15, 20, 30, 50, 100],
      pageList_PT: [],
      pageTotal_PT: 0,
      lifeHooksInitData: true,
      pageRequest_PT: undefined
    }
  },

  created () {
    if (this.lifeHooksInitData) {
      this.getTableData()
    }
  },

  methods: {
    onChangeLimit (limit) {
      this.limit_PT = limit
      this.params_PT.limit = this.limit_PT
      this.getTableData()
    },

    onChangePage (page) {
      this.page_PT = page
      this.params_PT.page = this.page_PT
      this.getTableData()
    },

    getTableData (params = this.params_PT) {
      if (!this.pageRequest_PT) {
        throw new Error(this.pageRequest_PT + 'is not a function')
      }
      this.pageRequest_PT(params)
        .then(res => {
          const list = res.page
          this.pageList_PT = this.dataProcessing ? this.dataProcessing(list.list) : list.list
          this.page_PT = list.currPage
          this.pageTotal_PT = list.totalCount
        })
    }
  }
}
