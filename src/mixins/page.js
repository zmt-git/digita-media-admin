export default {
  data () {
    return {
      pageCurrent: 1,
      pageLimit: 20,
      pageList: [],
      pageRequest: null,
      pageLoading: false,
      pageTotal: 0,
      scrollDisabled: false
    }
  },

  computed: {
    lengthList () {
      return this.pageList.length
    },
    noMore () {
      return this.pageList.length >= this.pageTotal
    }
  },

  methods: {
    async pageLoad () {
      this.pageLoading = true
      this.scrollDisabled = true
      await this.pageRequest({ page: this.pageCurrent, limit: this.pageLimit })
        .then(res => {
          this.pageTotal = res.page.totalCount
          this.pageCurrent = res.page.currPage
          if (this.pageCurrent < res.page.totalPage) {
            this.pageCurrent++
          }
          this.pageList = this.pageList.concat(res.page.list)
          this.scrollDisabled = this.setDisabled()
        })
        .catch(e => {
          console.log(e)
        })
      this.pageLoading = false
    },

    resetPageParams () {
      this.pageList = []
      this.pageCurrent = 1
      this.pageLimit = 20
      this.pageTotal = 0
      this.scrollDisabled = false
    },

    setDisabled () {
      return this.pageList.length >= this.pageTotal
    },

    refresh () {
      this.resetPageParams()
    }
  }
}
