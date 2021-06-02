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
      <!-- 登录+验证码 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">密码登录</el-menu-item>
        <el-menu-item index="1">验证码登录</el-menu-item>
      </el-menu>
      <div class="form-box">
        <transition-group
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div class="p" key="pwd" v-if="activeIndex === '0'">
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
              <el-form-item class="login-contanier-form__item" prop="randomStr" :style="style">
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
          <!-- 短信验证码登录 -->
          <div class="p" key="code" v-if="activeIndex === '1'">
            <el-form class="login-contanier-form" :model="codeForm" ref="codeForm" :rules="codeRules">
              <el-form-item class="login-contanier-form__item" prop="mobile">
                <el-input
                  prefix-icon
                  class="login-contanier-form__input"
                  clearable
                  tabindex='1'
                  placeholder="请输入手机号码"
                  v-model="codeForm.mobile"
                  @keyup.enter.native="handleLoginCode"
                >
                  <i slot="prefix" class="iconfont icon-shoujihaoma prefix-icon"></i>
                </el-input>
              </el-form-item>
              <el-form-item class="login-contanier-form__item" prop="code">
                <el-input
                  prefix-icon
                  class="login-contanier-form__input"
                  clearable
                  tabindex='2'
                  placeholder="请输入短信验证码"
                  v-model="codeForm.code"
                  @keyup.enter.native="handleLoginCode"
                >
                  <i slot="prefix" class="iconfont icon-duanxinyanzhengma prefix-icon"></i>
                  <el-button slot="suffix" size="mini" :disabled='codeDisabled || hasMobile' :loading='codeLoading' @click="getCode">{{codeBtnName}}</el-button>
                </el-input>
              </el-form-item>
              <el-button type="primary" class="login-contanier-form__btn" :disabled='btnDisabledCode' :loading='loading' @click="handleLoginCode">登录</el-button>

            </el-form>
          </div>
        </transition-group>
      </div>
      <div class="register primary" key="register">
        <span @click="toRegister">注册账号</span>
      </div>
    </div>
  </div>
</template>

<script>
import { codeLogin } from '@/api/system/login'
import smsCode from '@/mixins/smsCode'
import { telReg, codeReg } from '@/data/common'

export default {
  name: 'login',

  mixins: [smsCode],

  computed: {
    btnDisabled () {
      if (!this.loginForm.username || !this.loginForm.password) {
        return true
      } else {
        return false
      }
    },
    btnDisabledCode () {
      if (!this.codeForm.mobile || !this.codeForm.code) {
        return true
      } else {
        return false
      }
    },
    codeImgSrc () {
      return `${this.window.globalConfig.api_url}/sys/code/${this.time}`
    },

    hasMobile () {
      return !telReg.test(this.codeForm.mobile)
    }
  },

  data () {
    return {
      window: window,
      activeIndex: '0',
      codeRequest: codeLogin,
      style: {
        width: '100%'
      },
      codeForm: {
        mobile: '17691107141',
        code: ''
      },

      loginForm: {
        username: '15353711275',
        password: '123456',
        randomStr: ''
      },

      codeRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: telReg, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { pattern: codeReg, message: '验证码格式错误' }
        ]
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
      loading: false
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
    handleSelect (index) {
      this.activeIndex = index
    },

    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginActions', this.loginForm)
            .then(() => {
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

    handleLoginCode () {
      this.$refs.codeForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginCodeActions', this.codeForm)
            .then(() => {
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

    getCode () {
      this.getMobileCode(this.codeForm.mobile)
    },

    getCodeImg () {
      this.time = new Date().getTime()
    },

    toRegister () {
      this.$router.push('/register')
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
    width: 370px;
    height: 465px;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid $border-color;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 180px;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    /deep/ .el-menu{
      width: 100%;
    }
    /deep/ .el-menu-item{
      width: 50%;
      text-align: center;
    }
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
        line-height: 47px;
      }
      &__item{
        margin-bottom: 10px;
      }
      &__input{
        height: 50px;
      }
      &__btn{
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
.prefix-icon{
  font-size: 20px;
}
.p{
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 45px;
  padding-top: 20px;
}
.code{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 10px;
  & img{
    flex: 1;
  }
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
.form-box{
  width: 100%;
  flex: 1;
  position: relative;
  box-sizing: border-box;
}
.register{
  width: 100%;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  padding: 0 45px;
  font-size: 12px;
  cursor: pointer;
}
</style>
