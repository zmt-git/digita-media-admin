export default {
  data () {
    return {
      pageCurrent: 1,
      pageLimit: 20,
      pageList: [],
      pageRequest: null,
      pageLoading: false,
      pageTotal: 0
    }
  },

  computed: {
    lengthList () {
      return this.pageList.length
    },
    noMore () {
      return this.pageList.length >= this.pageTotal
    },
    disabled () {
      return this.pageLoading || this.noMore
    }
  },

  methods: {
    async pageLoad () {
      this.pageLoading = true
      await this.pageRequest({ page: this.pageCurrent, limit: this.pageLimit })
        .then(res => {
          this.pageTotal = res.page.totalCount
          this.pageSize = res.page.currPage
          this.pageSize < res.page.totalPage && this.pageSize++
          this.pageList = res.page.list
        })
        .catch(e => {
          console.log(e)
        })
      this.pageLoading = false
    }
  }
}
