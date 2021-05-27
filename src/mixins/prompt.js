export default {
  methods: {
    prompt (state) {
      if (state === 1) {
        this.message('设置成功', 'success')
      } else if (state === 0) {
        this.message('通讯超时', 'info')
      } else if (state === -2) {
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
