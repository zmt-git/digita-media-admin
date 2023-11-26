export default {
  methods: {
    prompt (state) { // 1成功，-1失败，-3 执行超时
      if (state === 1) {
        this.message('设置成功', 'success')
      } else if (state === -3) {
        this.message('执行超时', 'info')
      } else if (state === -1) {
        this.message('执行失败', 'warning')
      } else {
        this.message('操作失败，请重试！', 'error')
      }
    },

    message (msg = '设置成功', type = 'success') {
      this.$message({
        type: type,
        message: msg
      })
    }
  }
}
