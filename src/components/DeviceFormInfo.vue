<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-28 19:38:15
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-02 21:55:27
-->
<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="设备名称" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="安装位置" prop="location">
      <el-input v-model="ruleForm.location" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="设备编码" prop="code">
      <el-input v-model="ruleForm.code"></el-input>
    </el-form-item>
    <el-form-item>
      <slot>
        <el-button class="btn" type="primary" @click="submitForm">添加设备</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveDevice } from '@/api/device'
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
    return {
      ruleForm: {
        name: '',
        location: '',
        code: 'ELF'
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        location: [{ required: true, message: '请输入安装位置', trigger: 'blur' }],
        code: [{ required: true, pattern: /^(e|E)(l|L)(f|F)/, message: '设备编码应以elf开头' }]
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
