<template>
  <div class="register">
    <!-- 1.手机号获取验证码 -->
    <div class="register-item">
      <h3 class="title">欢迎注册数字媒体管家</h3>
      <el-form v-show="currentStep === 0" v-loading='loading' :inline='false' size="small" :model="formMobile" ref="formMobile" class="form" :rules="rulesMobile">
        <el-form-item prop="mobile">
          <el-input v-model="formMobile.mobile" placeholder="请输入手机号码">
            <i slot="prefix" class="iconfont icon-shoujihaoma prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formMobile.code" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon-duanxinyanzhengma prefix-icon"></i>
            <el-button slot="suffix" size="mini" :disabled='codeDisabled || hasMobile' :loading='codeLoading' @click="getCode">{{codeBtnName}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox @change="change" v-model="check"> 同意<a>《服务条款》</a></el-checkbox>
          <br/>
          <span class="error" v-show="checkPrompt">请先同意服务条款</span>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="btn" size="small" @click="next" :disabled='btnDisabled'>下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 2.用户信息 -->
      <el-form v-show="currentStep === 1" v-loading='loading' :inline='false' size="small" :model="formInfo" ref="formInfo" class="form" :rules="rulesInfo">
        <el-form-item prop="mobile">
          <el-radio-group v-model="formInfo.userType" @change="onChangeType">
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="0">个人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formInfo.username" :placeholder="username">
            <i slot="prefix" class="iconfont prefix-icon" :class="usernameIcon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="isNumber">
          <el-input v-model="formInfo.isNumber" :placeholder="isNumber">
            <i slot="prefix" class="iconfont prefix-icon" :class="isNumberIcon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="city">
          <i class="iconfont icon-location prefix-icon city"></i>
          <el-cascader
            size="large"
            :options="options"
            v-model="formInfo.city"
             placeholder="城市"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formInfo.password" placeholder="密码">
            <i slot="prefix" class="iconfont icon-mima prefix-icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-half" @click="back">返回</el-button>
          <el-button class="btn-half" type="primary">立即注册</el-button>
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
import { telReg, codeReg, companyCodeReg, idCardReg } from '@/data/common'
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
          if (!result) {
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
      formInfo: {
        userType: 1,
        username: '',
        isNumber: '',
        city: '',
        tradeType: '',
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
    back () {
      this.$refs.formInfo.resetFields()
      this.$refs.formMobile.resetFields()
      this.currentStep = 0
    },
    handleChange (val) {
      this.city = val.pop()
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
      return existMobile(this.formMobile.mobile)
        .then(res => {
          return res.msg
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
        } else {
          console.log('error submit')
        }
      })
    },
    register () {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          const params = Object.assign(this.formMobile, this.formInfo)
          registerLogin(params)
            .then(res => {
              this.$store.commit('set_user', res.data)
              setToken(res.data.token)
              this.$router.push('/device/')
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  &-item{
    width: 400px;
    height: 460px;
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
  /deep/ .el-form-item__content{
    position: relative;
  }
}
.title{
  line-height: 60px;
  font-size: 22px;
  margin-bottom: 10px;
}
.btn{
  width: 100%;
}
.btn-half{
  width: 48%;
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
.city{
  position: absolute;
  top: 2px;
  left: 4px;
  z-index: 2;
}
</style>
