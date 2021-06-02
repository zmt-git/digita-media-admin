<!--
 * @Description:
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 11:48:46
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-02 22:25:21
-->
<template>
  <div class="reset-password">
    <el-form v-loading='loading' :inline='true' size="small" :model="form" ref="form" class="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号码" required prop="mobile">
        <el-input v-model="form.mobile" clearable placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" required prop="code">
        <el-input v-model="form.code" clearable placeholder="请输入验证码">
          <el-button slot="suffix" size="mini" :disabled='codeDisabled || hasMobile' :loading='codeLoading' @click="getCode">{{codeBtnName}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" required prop="newPassword">
        <el-input type="password" clearable v-model="form.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" required prop="checkedPassword">
        <el-input type="password" clearable v-model="form.checkedPassword" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" size="small" @click="submit">确认</el-button>
    </el-form>
  </div>
</template>

<script>
import { resetCode, reset } from '@/api/system/login'
import smsCode from '@/mixins/smsCode'
import { telReg, codeReg } from '@/data/common'
export default {
  name: 'reset-password',

  mixins: [smsCode],

  computed: {
    hasMobile () {
      return !telReg.test(this.form.mobile)
    }
  },

  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      codeRequest: resetCode,
      loading: false,
      form: {
        mobile: '',
        code: '',
        newPassword: '',
        checkedPassword: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: telReg, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: codeReg, message: '验证码格式错误' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkedPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.updatePassWord()
          this.loading = false
        } else {
          console.log('error submit')
        }
      })
    },
    updatePassWord () {
      return reset(this.form)
        .then(res => {
          this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          this.$store.dispatch('logoutActions')
            .then(res => {
              this.$store.dispatch('logoutActions')
              this.$router.push('/login')
              location.reload()
            })
        })
        .catch(e => {
          console.log(e)
        })
    },

    getCode () {
      this.getMobileCode(this.form.mobile)
    }
  }
}
</script>
<style lang="scss" scoped>
.form{
  /deep/ .el-form-item__content{
    vertical-align: middle;
  }
  /deep/ .el-form-item{
    margin-bottom: 5px;
  }
  /deep/ .el-input__inner{
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #DCDFE6;
    width: 220px;
  }
}
.btn{
  width: 200px;
  position: relative;
  transform: translateX(80px);
}
</style>
