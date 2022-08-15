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
      class="img"
      :src="url"
      :preview-src-list="[url]">
    </el-image>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备编号" prop="code" required>
        <el-input :disabled="!isAdd" clearable placeholder="请输入设备编号" v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="type" v-if="isAdd">
        <el-select clearable v-model="ruleForm.type" placeholder="请选择设备型号" style='width: 100%'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else label="设备型号" prop="type" required>
        <el-input :disabled="!isAdd"  clearable placeholder="请输入设备型号" v-model="ruleForm.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name" required>
        <el-input clearable placeholder="请输入设备名称" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="安装位置" prop="location" required>
        <el-input clearable placeholder="请输入设备安装位置" v-model="ruleForm.location" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="安装方向" prop="stateOrient" required>
        <el-select clearable v-model="ruleForm.stateOrient" placeholder="请选择设备安装方向" style='width: 100%'>
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供电方式" prop="power" required>
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
          <el-button class="btn" type="primary" @click="submitForm">{{isAdd ? '添加设备' : '修改设备'}}</el-button>
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
    const codeValidator = async (rule, value, callback) => {
      if (value !== 0 && !value) {
        return callback()
      } else {
        if (!this.isAdd && this.dataForm.code === value) {
          return callback()
        }
        const result = await this.registerDevice(value)
        if (result) {
          return callback()
        } else {
          return callback(new Error('设备编号已注册！'))
        }
      }
    }
    return {
      options: deviceType,
      orientOptions: orient,
      powerOptions: powerOptions,
      url: require('../assets/device/orient.jpg'),
      ruleForm: {
        name: '',
        location: '',
        code: '',
        type: '',
        stateOrient: '',
        power: ''
      },
      rules: {
        name: [{ required: true, message: '请输入设备名称', trigger: ['blur', 'change'] }],
        location: [{ required: true, message: '请输入安装位置', trigger: ['blur', 'change'] }],
        code: [
          // { required: true, pattern: /^(e|E)(l|L)(f|F)/, message: '设备编号应以ELF开头', trigger: ['blur', 'change'] },
          { validator: codeValidator, trigger: 'blur' },
          { required: true, message: '请输入设备编号', trigger: ['blur', 'change'] }
        ],
        type: [{ required: true, message: '请选择设备型号', trigger: 'change' }],
        stateOrient: [{ required: true, message: '请选择安装方向', trigger: 'change' }],
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
      return registerDevice(code, { deviceCode: code })
        .then(res => {
          return res.state === 1
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
      if (!this.isAdd && this.dataForm.stateOrient !== this.ruleForm.stateOrient) {
        this.$confirm('设备的【安装方向】发生变化，您必须点击该设备【设备详情】页面的【发布】按钮手动发布播放列表，设备才能够正常工作。若设备当前离线，设备在线后，请勿遗忘此操作。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.validator()
        }).catch(() => {
          console.log('cancel')
        })
      } else {
        this.validator()
      }
    },

    validator () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.$emit('update:loading', true)
          const params = this.getParams()
          await saveDevice(params)
            .then(res => {
              this.$message({ type: 'success', message: this.isAdd ? '添加成功' : '编辑成功' })
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
    width: auto;
    height: 100%;
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
