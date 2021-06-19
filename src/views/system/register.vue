<template>
  <div class="register" v-loading='loading'>
    <!-- 1.手机号获取验证码 -->
    <div class="register-item">
      <h3 class="title">欢迎注册</h3>
      <el-form v-show="currentStep === 0" :inline='false' size="small" :model="formMobile" ref="formMobile" class="form" :rules="rulesMobile">
        <el-form-item prop="mobile" class="form-item">
          <el-input v-model="formMobile.mobile" @keyup.enter.native="next" clearable placeholder="请输入手机号码">
            <i slot="prefix" class="iconfont icon-shoujihaoma prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <el-input v-model="formMobile.code" clearable placeholder="请输入验证码" @keyup.enter.native="next">
            <i slot="prefix" class="iconfont icon-duanxinyanzhengma prefix-icon"></i>
            <el-button slot="suffix" size="mini" :disabled='codeDisabled || hasMobile' :loading='codeLoading' @click="getCode">{{codeBtnName}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox @change="change" clearable v-model="check"> 同意<span class="user-agreement primary" @click.self="toUserAgreement">《服务条款》</span></el-checkbox>
          <br/>
          <span class="error" v-show="checkPrompt">请先同意服务条款</span>
        </el-form-item>
        <el-form-item label="" class="form-item">
          <el-button type="primary" class="btn" size="small" @click="next" :disabled='btnDisabled'>下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 2.用户信息 -->
      <el-form v-show="currentStep === 1" :inline='false' size="small" :model="formInfo" ref="formInfo" class="form" :rules="rulesInfo">
        <el-form-item prop="mobile">
          <el-radio-group v-model="formInfo.userType" @change="onChangeType">
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="0">个人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="username" class="form-item">
          <el-input clearable v-model="formInfo.username" :placeholder="username">
            <i slot="prefix" class="iconfont prefix-icon" :class="usernameIcon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="isNumber" class="form-item">
          <el-input clearable v-model="formInfo.isNumber" :placeholder="isNumber">
            <i slot="prefix" class="iconfont prefix-icon" :class="isNumberIcon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="city" class="form-item">
          <i class="iconfont icon-location prefix-icon icon"></i>
          <el-cascader
            clearable
            size="large"
            :options="options"
            v-model="formInfo.city"
             placeholder="城市"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item prop="tradeType" class="form-item">
          <i class="iconfont icon-xingye prefix-icon icon"></i>
          <el-select clearable v-model="formInfo.tradeType" filterable placeholder="行业">
            <el-option
              v-for="item in optionsTrade"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="password" class="form-item">
          <el-input clearable v-model="formInfo.password" type="password" placeholder="密码">
            <i slot="prefix" class="iconfont icon-mima prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item  class="form-item">
          <el-button class="btn-half" @click="back">返回</el-button>
          <el-button class="btn-half" type="primary" @click="registerUser">立即注册</el-button>
        </el-form-item>
      </el-form>
      <div class="login">
        <span class="primary" @click="toLogin">已有账号，去登录</span>
        <span v-if="currentStep === 1" class="info" @click="dialogVisible = true">实名认证说明</span>
      </div>
    </div>
    <el-dialog
      title="实名认证说明"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <p class="explanation error"> 根据《中华人名共和国广告法》以及国信办通字﹝2019﹞3号《网络音视频信息服务管理规定》，您必须完成实名认证； </p>
        <p class="explanation error"> 请选择用户身份，完成认证 </p>
        <p class="explanation error"> 企业用户请填写组织机构名称和组织机构代码； </p>
        <p class="explanation error"> 个人用户请填写姓名和居民身份信息 </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
import smsCode from '@/mixins/smsCode'
import { registerCode, registerLogin, existMobile } from '@/api/system/login'
import { telReg, codeReg, companyCodeReg, idCardReg, tradeType } from '@/data/common'
import { setToken } from '@/utils/cache/cacheToken'
export default {
  name: 'register',

  mixins: [smsCode],

  computed: {
    hasMobile () {
      return !telReg.test(this.formMobile.mobile)
    },
    btnDisabled () {
      if (!this.formMobile.mobile || !this.formMobile.code) {
        return false
      } else {
        return false
      }
    },
    username () {
      return this.formInfo.userType === 0 ? '姓名' : '企业名称'
    },
    usernameIcon () {
      return this.formInfo.userType === 0 ? 'icon-denglu1' : 'icon-qiyemingcheng'
    },
    isNumber () {
      return this.formInfo.userType === 0 ? '身份证号码' : '企业代码'
    },
    isNumberIcon () {
      return this.formInfo.userType === 0 ? 'icon-shenfenzhenghaoma' : 'icon-qiyemingcheng1'
    }
  },

  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.formInfo.userType === 0 ? '请输入姓名' : '请输入企业名称'))
      } else {
        callback()
      }
    }
    const validateIsNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.formInfo.userType === 0 ? '请输入身份证号码' : '请输入企业代码'))
      } else {
        if (this.formInfo.userType === 1 && !companyCodeReg.test(value)) {
          return callback(new Error('企业代码格式错误'))
        } else if (this.formInfo.userType === 0 && !idCardReg.test(value)) {
          return callback(new Error('身份证格式错误'))
        } else {
          callback()
        }
      }
    }
    const validateMobile = async (rule, value, callback) => {
      if (value) {
        try {
          const result = await this.isOnlyMobile()
          if (result) {
            callback(new Error('手机号码已注册！'))
          } else {
            callback()
          }
        } catch (e) {
          callback(new Error(e))
        }
      } else {
        callback()
      }
    }
    return {
      currentStep: 0,
      loading: false,
      check: false,
      checkPrompt: false,
      dialogVisible: false,
      options: provinceAndCityData,
      optionsTrade: tradeType,
      codeRequest: registerCode,
      formMobile: {
        mobile: '',
        code: ''
      },
      rulesMobile: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: telReg, message: '手机号码格式错误' },
          { validator: validateMobile, trigger: 'change', required: true }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: codeReg, message: '验证码格式错误' }
        ]
      },
      cityCode: null,
      formInfo: {
        userType: 1,
        username: '',
        isNumber: '',
        city: '',
        tradeType: '智能交通',
        password: ''
      },
      rulesInfo: {
        username: [{ validator: validateUsername, trigger: 'blur', required: true }],
        isNumber: [{ validator: validateIsNumber, trigger: 'blur', required: true }],
        city: [{ required: true, message: '请选择城市' }],
        tradeType: [{ required: true, message: '请选择行业' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },

  methods: {
    toUserAgreement () {
      this.$router.push('/userAgreement')
    },
    back () {
      this.$refs.formInfo.resetFields()
      this.$refs.formMobile.resetFields()
      this.currentStep = 0
    },
    handleChange (val) {
      this.cityCode = val[val.length - 1]
    },
    onChangeType () {
      this.$refs.formInfo.resetFields()
    },
    toLogin () {
      this.$router.push('/login')
    },
    getCode () {
      this.getMobileCode(this.formMobile.mobile)
    },
    change () {
      this.checkPrompt = !this.check
    },
    isOnlyMobile () {
      return existMobile({ mobile: this.formMobile.mobile })
        .then(res => {
          return res.msg === 'true'
        })
        .catch(e => console.log(e))
    },
    next () {
      if (!this.check) {
        this.checkPrompt = true
        return
      }
      this.$refs.formMobile.validate(valid => {
        if (valid) {
          this.currentStep = 1
          this.clear()
        } else {
          console.log('error submit')
        }
      })
    },
    registerUser () {
      const _this = this
      this.$refs.formInfo.validate(async valid => {
        if (valid) {
          _this.loading = true
          console.log(_this.formMobile)
          const params = Object.assign(_this.formInfo, _this.formMobile)
          params.city = _this.cityCode
          await registerLogin(params)
            .then(res => {
              _this.$store.commit('set_user', res.data)
              setToken(res.data.token)
              _this.$router.push('/device')
            })
            .catch(e => {
              console.log(e)
            })
          _this.loading = false
        } else {
          console.log('error submit')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.register{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  font-size: 16px;
  &-item{
    width: 400px;
    min-height: 480px;
    padding: 0 45px;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  /deep/ .el-input__inner{
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #DCDFE6;
  }
  /deep/ .el-cascader{
    width: 100%;
    & .el-input__inner{
      padding: 0 15px 0 30px;
      box-sizing: border-box;
    }
  }
  /deep/ .el-select{
    width: 100%;
    & .el-input__inner{
      padding: 0 15px 0 30px;
      box-sizing: border-box;
    }
  }
  /deep/ .el-form-item__content{
    position: relative;
  }
}
.title{
  line-height: 60px;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 100;
}
.btn{
  width: 100%;
}
.btn-half{
  width: 48%;
  margin-top: 10px;
}
.login{
  width: 100%;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  font-size: 12px;
  justify-content: space-between;
  cursor: pointer;
}
.explanation{
  text-indent: 24px;
  line-height: 24px;
  font-size: 16px;
}
.prefix-icon{
  color: #C0C4CC;
}
.icon{
  position: absolute;
  top: 6px;
  left: 0px;
  z-index: 2;
}
.user-agreement{
  @include color('primary');
  margin: 0 10px;
}
.form-item{
  font-size: 16px;
  height: 50px;
  margin-bottom: 10px;
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
}
</style>
