<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-28 19:38:15
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 16:48:17
-->
<template>
  <div class="add-device">
    <el-image
      v-if="isAdd"
      class="img"
      :src="url"
      :preview-src-list="[url]">
    </el-image>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备编码" prop="code" required v-if="isAdd">
        <el-input clearable v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="type" v-if="isAdd">
        <el-select clearable v-model="ruleForm.type" placeholder="请选择设备类型" style='width: 100%'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="name" required>
        <el-input clearable v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="安装位置" prop="location" required>
        <el-input clearable v-model="ruleForm.location" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="安装方向" prop="orient" required v-if="isAdd">
        <el-select clearable v-model="ruleForm.orient" placeholder="请选择设备安装方向" style='width: 100%'>
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供电方式" prop="power" required v-if="isAdd">
        <el-select clearable v-model="ruleForm.power" placeholder="请选择设备供电方式" style='width: 100%'>
          <el-option
            v-for="item in powerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <slot>
          <el-button class="btn" type="primary" @click="submitForm">{{isAdd ? '添加设备' : '编辑'}}</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveDevice, registerDevice } from '@/api/device'
import { deviceType, orient, powerOptions } from '@/data/common'
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
    // const validateCode = async (rule, value, callback) => {
    //   if (value) {
    //     try {
    //       const result = await this.registerDevice(value)
    //       if (result) {
    //         callback(new Error('设备未注册'))
    //       } else {
    //         callback()
    //       }
    //     } catch (e) {
    //       callback(new Error(e))
    //     }
    //   } else {
    //     callback()
    //   }
    // }

    return {
      options: deviceType,
      orientOptions: orient,
      powerOptions: powerOptions,
      url: require('../assets/device/orient.png'),
      ruleForm: {
        name: '',
        location: '',
        code: 'ELF',
        type: '',
        orient: '',
        power: ''
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        location: [{ required: true, message: '请输入安装位置', trigger: 'blur' }],
        code: [
          { required: true, pattern: /^(e|E)(l|L)(f|F)/, message: '设备编码应以ELF开头' }
          // { validator: validateCode, trigger: 'blur', required: true }
        ],
        type: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        orient: [{ required: true, message: '请选择安装方向', trigger: 'change' }],
        power: [{ required: true, message: '请选择供电方式', trigger: 'change' }]
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

    getParams () {
      if (this.isAdd) {
        return this.ruleForm
      } else {
        return Object.assign(this.dataForm, this.ruleForm)
      }
    },

    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.$emit('update:loading', true)
          const params = this.getParams()
          await saveDevice(params)
            .then(res => {
              this.$message({ type: 'success', message: '添加成功' })
              this.$emit('submit', res.data)
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
.add-device{
  display: flex;
  justify-content: center;
  align-items: center;
}
.img{
  width: 346px;
  min-width: 346px;
  height: 434px;
  margin-right: 30px;
  position: relative;
  top: -10px;
  /deep/ .el-image__inner{
    min-width: 346px;
    width: 346px;
    height: 434px;
  }
}
.demo-ruleForm{
  width: 400px;
  min-width: 300px;
}
.btn{
  width: 100%;
}
</style>
