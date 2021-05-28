<!--
 * @Description: 登录页面
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:28:47
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:12:21
-->
<template>
  <div class="login">
    <div class="login-contanier">
      <el-form class="login-contanier-form" :model="loginForm" ref="loginForm" :rules="loginRules">
        <el-form-item class="login-contanier-form__item" prop="username">
          <el-input
            prefix-icon
            class="login-contanier-form__input"
            clearable
            ref="username"
            placeholder="请输入用户名"
            tabindex='1'
            v-model="loginForm.username"
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="iconfont icon-denglu1 prefix-icon"></i>
          </el-input>
        </el-form-item>

        <el-form-item class="login-contanier-form__item" prop="password">
          <el-input
            prefix-icon
            class="login-contanier-form__input"
            clearable
            ref="password"
            tabindex='2'
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
            show-password
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="iconfont icon-mima prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="login-contanier-form__item" prop="username">
          <el-input
            prefix-icon
            class="login-contanier-form__input"
            clearable
            ref="randomStr"
            placeholder="请输入验证码"
            tabindex='1'
            v-model="loginForm.randomStr"
            @keyup.enter.native="handleLogin"
          >
            <i slot="prefix" class="iconfont icon-yanzhengma1 prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
         <div class="code">
            <img :src="codeImgSrc" alt="验证码">
            <el-button @click="getCodeImg" size="small">点击刷新</el-button>
         </div>
        </el-form-item>
        <el-button type="primary" class="login-contanier-form__btn" :disabled='btnDisabled' :loading='loading' @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  computed: {
    btnDisabled () {
      if (!this.loginForm.username || !this.loginForm.password) {
        return true
      } else {
        return false
      }
    },
    codeImgSrc () {
      return `${this.window.globalConfig.api_url}/sys/code/${this.time}`
    }
  },

  data () {
    return {
      window: window,
      loginForm: {
        username: '15353711275',
        password: '123456',
        randomStr: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        randomStr: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      time: new Date().getTime(),
      loading: false,
      iconClass: 'icon--' // icon-eyesopen
    }
  },

  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginActions', this.loginForm)
            .then(async () => {
              await this.$store.dispatch('infoUserActions')
              this.$router.push({ path: '/device/' })
              this.loading = false
            })
            .catch((e) => {
              console.log(e)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getCodeImg () {
      this.time = new Date().getTime()
    }
  }
}
</script>

<style scoped lang='scss'>
$border-color: #0088ff;
$border-color2: #eaf6f2;
$bg-color: #0088fe;
$color: #f9ffff;
.login{
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  box-sizing: border-box;
  padding: 0 .1rem;
  background-color: #000000;
  & *::selection{
    user-select: none;
  }
  &-contanier{
    width: 400px;
    height: 450px;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid $border-color;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 180px;
    margin: auto;
    border-radius: 5px;
    padding: 0 45px;
    padding-top: 54px;
    overflow: hidden;
    &-form{
      font-size: 20px;
      /deep/ .el-input__inner{
        height: 50px;
        background-color: transparent;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #f0f0f0;
        color: #000000;
        font-size: 16px;
      }
      /deep/ .el-input__prefix{
        left: 0;
      }
      &__item{
        margin-bottom: 10px;
      }
      &__input{
        height: 50px;
      }
      &__btn{
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
.prefix-icon{
  font-size: 20px;
}
.code{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}
@media screen and (max-width: 750px) {
  .login-contanier{
    width: calc(100% - 2rem);
    box-sizing: border-box;
    right: 0;
    left: 0;
    padding: 0 1.5rem;
    padding-top: 1.5rem;
    &__img{
      height: 1.8rem;
    }
  }
}
.close{
  cursor: pointer;
}
</style>
