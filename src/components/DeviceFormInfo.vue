<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-28 19:38:15
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 16:48:17
-->
<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="设备编码" prop="code">
      <el-input clearable v-model="ruleForm.code"></el-input>
    </el-form-item>
    <el-form-item label="设备类型" prop="type">
      <el-select clearable v-model="ruleForm.type" placeholder="请选择设备类型" style='width: 100%'>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="安装位置" prop="location">
      <el-input clearable v-model="ruleForm.location" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="设备名称" prop="name">
      <el-input clearable v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <slot>
        <el-button class="btn" type="primary" @click="submitForm">添加设备</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveDevice, registerDevice } from '@/api/device'
import { deviceType } from '@/data/common'
import prompt from '@/mixins/prompt'
export default {
  name: 'device-form-info',

  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    dataForm: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  mixins: [prompt],

  data () {
    const validateCode = async (rule, value, callback) => {
      if (value) {
        try {
          const result = await this.registerDevice(value)
          if (result) {
            callback(new Error('设备未注册'))
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
      options: deviceType,
      ruleForm: {
        name: '',
        location: '',
        code: 'ELF',
        type: ''
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        location: [{ required: true, message: '请输入安装位置', trigger: 'blur' }],
        code: [
          { required: true, pattern: /^(e|E)(l|L)(f|F)/, message: '设备编码应以ELF开头' },
          { validator: validateCode, trigger: 'blur', required: true }
        ],
        type: [{ required: true, message: '请选择设备类型', trigger: 'change' }]
      }
    }
  },

  mounted () {
    if (this.isAdd) {
      this.$refs.ruleForm.resetFields()
    } else {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = this.dataForm[key]
      })
    }
  },

  methods: {
    registerDevice (code) {
      return registerDevice(code)
        .then(res => {
          return res.msg === 'false'
        })
        .catch(e => {
          console.log(e)
          return false
        })
    },

    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.$emit('update:loading', true)
          await saveDevice(this.ruleForm)
            .then(res => {
              this.prompt(res.state)
              if (res.state === 1) {
                this.$emit('submit', res.data)
              }
            })
            .catch(e => {
              console.log(e)
            })
          this.$emit('update:loading', false)
        } else {
          console.log('error submit')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn{
  width: 100%;
}
</style>
