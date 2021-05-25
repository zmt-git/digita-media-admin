/*
 * @Description: 表格数据分页mixin
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-19 16:16:11
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-27 11:09:57
 */
import { isFunction } from '@/utils/tools/typeTool'
export default {
  data () {
    return {
      pageCurrent: 1, // 分页当前页
      pageSize: 15, // 分页当前条数
      pageSizes: [15, 20, 30, 50], // 分页当前条数可选值
      pageTotal: 0, // 分页总条数
      pageParams: {}, // 分页参数
      pageSearchParams: {}, // 搜索params
      pageSearchData: {}, // 搜索data
      pageData: [], // 分页数据
      pageDesc: true, // 分页降序，默认为true，反之为升序
      pageSort: ['createTime'], // 分页默认排序字段
      pageLoading: false, // 分页加载状态
      pageRequest: undefined, // 分页请求api
      pageSelectList: [], // 表格选中数据
      pageHooksMounted: true // 是否调用mixin的mounted生命周期
    }
  },

  async mounted () {
    if (!this.pageHooksMounted) return
    if (this.mountedCallBack) {
      await this.mountedCallBack()
    }
    this.setPageParams()
    this.getPageData(this.pageParams)
  },

  methods: {
    // ========================================
    // set params
    // ========================================
    setPageParams () {
      if (this.beforeSearch) this.beforeSearch()

      this.pageParams.data = {
        size: this.pageSize,
        current: this.pageCurrent,
        condition: this.pageSearchData
      }
      this.pageDesc ? this.pageParams.data.descs = this.pageSort : this.pageParams.ascs = this.pageSort
      this.pageParams.params = this.pageSearchParams
    },

    // ========================================
    // set 分页加载状态
    // ========================================
    setPageLoading (loading = true) {
      this.pageLoading = loading
    },

    // ========================================
    // 分页改变当前条数
    // ========================================
    onSizeChange (size) {
      this.pageSize = size
      this.setPageParams()
      this.getPageData(this.pageParams)
    },

    // ========================================
    // 分页改变当前页数
    // ========================================
    onCurrentChange (current) {
      this.pageCurrent = current
      this.setPageParams()
      this.getPageData(this.pageParams)
    },

    // ========================================
    // 检索条件params 设置
    // ========================================
    beforeSearch () {
      for (const key in this.pageSearchParams) {
        this.pageSearchParams[key] = this.formData[key]
      }
      for (const key in this.pageSearchData) {
        this.pageSearchData[key] = this.formData[key]
      }
    },

    // ========================================
    // 检索条件page
    // ========================================
    onSearchPage () {
      this.pageCurrent = 1
      this.setPageParams()
      this.getPageData(this.pageParams)
    },

    // ========================================
    // 清除解锁条件
    // ========================================
    onCleanSearchPage () {
      this.pageCurrent = 1
      this.setPageParams()
      this.pageParams.data.condition = {}
      this.pageParams.params = {}

      this.getPageData(this.pageParams)
    },
    // ========================================
    // 表格选中数据
    // ========================================
    onSelectionChange (list) {
      this.pageSelectList = list
    },

    // ========================================
    // 获取数据方法
    // ========================================
    async getPageData () {
      if (!isFunction(this.pageRequest)) {
        throw new Error('the pageRequest must be a function')
      }
      this.setPageLoading()
      const args = [].slice.call(arguments)
      if (args.length === 0) {
        args.push({ data: { size: this.pageSize, current: this.pageCurrent } })
      }
      await this.pageRequest(...args)
        .then(res => {
          this.pageTotal = res.result.total
          this.pageData = res.result.records
          this.pageCurrent = res.result.current
          this.pageSize = res.result.size
        })
        .catch(e => console.log(e))
      this.setPageLoading(false)
    }
  }
}
