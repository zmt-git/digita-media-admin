<!--
 * @Description:
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 11:48:46
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-25 11:15:41
-->
<template>
  <el-form v-loading='loading' :inline='true' size="small" :model="form" ref="form" class="form" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" required prop="oldPassWord">
      <el-input type="password" v-model="form.oldPassWord" placeholder="请输入旧密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" required prop="newPassWord">
      <el-input type="password" v-model="form.newPassWord" placeholder="请输入新密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" required prop="checkedPassword">
      <el-input type="password" v-model="form.checkedPassword" placeholder="请确认新密码"></el-input>
    </el-form-item>
    <el-button type="primary" class="btn" size="small" @click="submit">确认</el-button>
  </el-form>
</template>

<script>
import { passwordUser } from '@/api/user'
export default {
  name: 'reset-password',

  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        oldPassWord: '',
        newPassWord: '',
        checkedPassword: ''
      },
      rules: {
        oldPassWord: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /\w{6,15}/, message: '密码规则为6-15位字母数字下划线', trigger: 'blur' }
        ],
        checkedPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
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
      return passwordUser(this.form)
        .then(res => {
          this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          this.$store.dispatch('logoutActions')
            .then(res => {
              this.$router.push('/login')
              location.reload()
            })
        })
        .catch(e => {
          console.log(e)
        })
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
}
.btn{
  width: 200px;
  position: relative;
  transform: translateX(80px);
}
</style>
