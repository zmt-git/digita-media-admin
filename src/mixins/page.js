export default {
  data () {
    return {
      pageSize: 20,
      pageCurrent: 1,
      pageList: [],
      pageRequest: null,
      pageLoading: false,
      pageTotal: 0
    }
  },

  computed: {
    noMore () {
      return this.pageList.length >= this.pageTotal
    },
    disabled () {
      return this.loading || this.noMore
    }
  },

  methods: {
    async pageLoad () {
      this.pageLoading = true
      await this.pageRequest({ page: this.pageSize, limit: this.pageCurrent })
        .then(res => {
          this.pageSize++
        })
        .catch(e => {
          console.log(e)
        })
      this.pageLoading = false
    }
  }
}
