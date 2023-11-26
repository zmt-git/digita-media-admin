import { isType } from '@/utils/tools/typeTool'
export default {
  data () {
    return {
      codeLoading: false,
      codeDisabled: false,
      codeBtnName: '获取验证码',
      count: 60,
      timer: null,
      codeRequest: null
    }
  },
  methods: {
    async getMobileCode (mobile) {
      if (!isType(this.codeRequest, 'Function')) {
        throw new Error(this.codeRequest + 'must be a function')
      }
      this.codeDisabled = true
      this.codeLoading = true
      await this.codeRequest(mobile)
        .then(() => {
          this.$message({ type: 'success', message: '验证码已发送至手机，请注意查收' })
          this.startInterval()
        })
        .catch(e => console.log(e))
      this.codeLoading = false
    },

    startInterval () {
      this.count = 60
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.count <= 0) {
          clearInterval(this.timer)
          this.codeDisabled = false
          this.timer = null
          this.count = 60
          this.codeBtnName = '重新获取验证码'
          return
        }
        this.count--
        this.codeBtnName = `${this.count}s后重新获取`
      }, 1000)
    },

    clear () {
      this.timer && clearInterval(this.timer)
      this.codeDisabled = false
      this.timer = null
      this.count = 60
      this.codeBtnName = '获取验证码'
    }
  }
}
