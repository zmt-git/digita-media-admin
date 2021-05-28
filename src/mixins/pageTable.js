export default {
  data () {
    return {
      loading_PT: false,
      page_PT: 1,
      limit_PT: 15,
      params_PT: {
        page: this.page_PT,
        limit: this.limit_PT
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
    },

    onChangePage (page) {
      this.page_PT = page
    },

    getTableData () {
      if (!this.pageRequest_PT) {
        throw new Error(this.pageRequest_PT + 'is not a function')
      }
      this.pageRequest_PT(this.params_PT)
        .then(res => {
          const list = res.page
          this.pageList_PT = list.list
          this.page_PT = list.currPage
          this.pageTotal_PT = list.totalCount
        })
    }
  }
}
