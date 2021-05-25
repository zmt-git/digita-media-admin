<!--
 * @Description: 登录页面
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-20 10:28:47
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-20 13:59:35
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
            ref="mobile"
            placeholder="请输入用户名"
            tabindex='1'
            v-model="loginForm.mobile"
            @keyup.enter.native="handleLogin"
          >
            <img slot="prefix" class="input__img" src="../../assets/login/user.png"/>
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
            :type="inputType"
            v-model="loginForm.password"
            @keyup.enter.native="handleLogin"
          >
            <img slot="prefix" class="input__img" src="../../assets/login/lock.png"/>
            <i slot="suffix" class="input__img iconfont close" :class="iconClass" @click="changeType"></i>
          </el-input>
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
      if (!this.loginForm.mobile || !this.loginForm.password) {
        return true
      } else {
        return false
      }
    },

    inputType () {
      if (this.iconClass === 'icon--') {
        return 'password'
      } else {
        return 'text'
      }
    }
  },

  data () {
    return {
      loginForm: {
        mobile: '',
        password: '',
        freeLogin: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false,
      iconClass: 'icon--' // icon-eyesopen
    }
  },

  mounted () {
    if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    changeType () {
      this.iconClass === 'icon--' ? this.iconClass = 'icon-yanjing' : this.iconClass = 'icon--'
    },

    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginActions', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' })
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
    height: 500px;
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
    &__img{
      height: 40px;
    }
    &-form{
      margin-top: 75px;
      font-size: 20px;
      /deep/ .el-input__inner{
        height: 50px;
        background-color: transparent;
        border: 0;
        border-radius: 0;
        border-bottom: 2px solid $border-color2;
        color: #000000;
        font-size: 20px;
      }
      /deep/ .el-input__prefix{
        left: 0;
      }
      &__item{
        margin-bottom: 30px;
      }
      &__input{
        height: 50px;
      }
      &__btn{
        width: 100%;
        height: 50px;
        font-size: 24px;
        margin-top: 30px;
        // background-color: $bg-color;
      }
    }
  }
}
.input__img{
  width: 18px;
  vertical-align: middle;
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
