<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading='loading'>
    <el-form-item label="设备名称" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="安装位置" prop="location">
      <el-input v-model="ruleForm.location" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="设备编码" prop="code">
      <el-input v-model="ruleForm.code"></el-input>
    </el-form-item>
    <el-form-item label-width="0">
      <slot>
        <el-button class="btn" type="primary" @click="submitForm">添加设备</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { saveDevice } from '@/api/device'
export default {
  name: 'device-form',

  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    dataForm: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      loading: false,
      ruleForm: {
        name: '',
        location: '',
        code: ''
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
          this.loading = true
          await saveDevice(this.ruleForm)
            .then(res => {
              this.$emit('submit', res.data)
            })
            .catch(e => {
              console.log(e)
            })
          this.$emit('submit', {})

          this.loading = false
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
