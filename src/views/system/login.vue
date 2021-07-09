<!--
 * @Description: 登录页面
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:28:47
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 19:36:52
-->
<template>
  <div class="login">
    <!-- <base-page-loading-view key="pageLoadingState" v-if="pageLoadingState"></base-page-loading-view> -->
    <div class="login-box center">
      <div class="login-box-left">
        <h3 class="login-box-left_title">
          云智能交通标志综合管理平台
        </h3>
        <div class="login-box-left-bottom">
          <p class="login-box-left_des"><span>智能互联</span><span class="point"></span><span>科技赋能</span></p>
          <div class="login-box-left-progress">
        </div>
        </div>
      </div>
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
                <el-form-item class="login-contanier-form__item" prop="captcha" :style="style">
                  <el-input
                    prefix-icon
                    class="login-contanier-form__input"
                    ref="captcha"
                    placeholder="请输入验证码"
                    tabindex='3'
                    v-model="loginForm.captcha"
                    @keyup.enter.native="handleLogin"
                  >
                    <i slot="prefix" class="iconfont icon-yanzhengma1 prefix-icon"></i>
                    <img class="code-img" slot="suffix" :src="codeImgSrc" @click="getCodeImg" alt="验证码" title="点击重新获取">
                  </el-input>
                </el-form-item>
                <el-form-item>
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
  </div>
</template>

<script>
import { codeLogin } from '@/api/system/login'
import smsCode from '@/mixins/smsCode'
import { telReg, codeReg } from '@/data/common'
import { removeToken, setToken } from '@/utils/cache/cacheToken'
import { close } from '@/utils/http/websocket'
// import BasePageLoadingView from '@/components/BasePageLoadingView'
import { mapGetters } from 'vuex'

export default {
  name: 'login',

  mixins: [smsCode],

  // components: { BasePageLoadingView },

  computed: {
    ...mapGetters(['pageLoadingState']),
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
        mobile: '',
        code: ''
      },

      loginForm: {
        username: '',
        password: '',
        captcha: '',
        randomStr: ''
      },

      codeRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
          { pattern: telReg, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: ['blur', 'change'] },
          { pattern: codeReg, message: '验证码格式错误' }
        ]
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ]
      },
      time: new Date().getTime(),
      loading: false
    }
  },

  mounted () {
    close()
    removeToken()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.loginForm.randomStr = new Date().getTime()
  },

  methods: {
    handleSelect (index) {
      this.activeIndex = index
    },

    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.randomStr = this.time
          this.$store.dispatch('loginActions', this.loginForm)
            .then((res) => {
              setToken(res.token)
              this.$router.push({ path: '/device' })
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
            .then((res) => {
              setToken(res.data.token)
              this.$router.push({ path: '/device' })
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
  background-image: url('../../assets/login/bg.jpg');
  background-size: 100% 100%;
  & *::selection{
    user-select: none;
  }
  &-box{
    width: 1430px;
    height: 400px;
    border-radius: 12px;
    background-image: url('../../assets/login/form_bg.png');
    background-size: cover;
    display: flex;
    justify-content: space-between;
    &-left{
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding-left: 45px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &_title{
        font-size: 32px;
        margin-top: 54px;
        color: #0036a5;
        letter-spacing: 5px;
        font-weight: 600;
      }
      &-bottom{
        margin-bottom: 30px;
      }
      &_des{
        color: #508aff;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 4px;
        & span{
          line-height: 20px;
        }
      }
      &-progress{
        width: 557px;
        height: 15px;
        margin-top: 20px;
        overflow: hidden;
        background-image: url('../../assets/login/progress.png');
        animation: progress-bar-stripes 2s linear infinite;
      }
    }
  }
  &-contanier{
    width: 370px;
    min-width: 370px;
    height: 100%;
    background-color: #ffffffdb;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    /deep/ .el-menu{
      width: 100%;
    }
    /deep/ .el-menu{
      background-color: #ffffffdb;
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
      /deep/ .el-input__suffix-inner{
        height: 100%;
        display: flex;
        align-items: center;
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
.code-img{
  width: 120px;
  cursor: pointer;
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
.point{
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #508aff;
  position: relative;
  top: -4px;
  margin: 0 17px;
}
@keyframes progress-bar-stripes {
  0% {
    background-position: 43px 0;
  }
  100% {
    background-position: 0 0;
  }
}
@media screen and (min-width: 1600px) {
  .login-box{
    width: 1440px;
  }
}
@media screen and (max-width: 1600px) {
  .login-box{
    width: calc(100% - 120px);
  }
}

@media screen and (min-width: 1140px) {
  .login-box-left-progress{
    width: 557px;
  }
}

@media screen and (max-width: 1140px) {
  .login-box-left-progress{
    width: calc(100% - 40px);
  }
}

@media screen and (max-width: 750px) {
  .login-box-left{
    display: none;
  }
  .login-contanier{
    width: 100%;
  }
}

</style>
