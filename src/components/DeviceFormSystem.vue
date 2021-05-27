<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 21:21:40
-->
<template>
  <ul class="device-form-system">
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">开机动画</span>
      <el-switch v-model="dataForm.stateLogo" :disabled='disabled' active-color="#13ce66" inactive-color="#ff4949" @change="setLogo"></el-switch>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">信息提示</span>
      <el-switch v-model="dataForm.stateInfo" :disabled='disabled' active-color="#13ce66" inactive-color="#ff4949" @change="setInfo"></el-switch>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">重启智能终端</span>
      <el-button type="primary" size="mini" :disabled='disabled' @click="rebootDevice">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">重启核心程序</span>
      <el-button type="primary" size="mini" :disabled='disabled' @click="rebootApp">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">上传工作日志</span>
      <el-button type="primary" size="mini" :disabled='disabled' @click="uploadLog">重启</el-button>
    </li>
    <li class="device-form-system-item">
      <span class="device-form-system-item_name">恢复出厂设置</span>
      <el-button type="danger" size="mini" :disabled='disabled' @click="reset">恢复</el-button>
    </li>
  </ul>
</template>

<script>
import { logoDevice, infoDevicePost, rebootAllDevice, rebootAppDevice, uploadLogDevice, resetDevice } from '@/api/device'
import prompt from '@/mixins/prompt'
export default {
  name: 'device-form-system',

  mixins: [prompt],

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    id () {
      return this.info.id ? this.info.id : undefined
    }
  },

  data () {
    return {
      dataForm: {
        timeControl: '',
        timeClose: '',
        timeOpen: '',
        lightControl: 0,
        lightBrightness: '100',
        stateOrient: '',
        stateVolume: 10,
        stateLogo: '',
        stateInfo: ''
      }
    }
  },

  mounted () {
    this.assginFormData(this.info)
  },

  methods: {
    assginFormData (obj) {
      Object.keys(this.dataForm).forEach(key => {
        this.dataForm[key] = obj[key]
      })
    },

    setLogo () {
      this.$emit('update:loading', true)
      logoDevice(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    setInfo () {
      this.$emit('update:loading', true)
      infoDevicePost(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    rebootDevice () {
      this.$emit('update:loading', true)
      rebootAllDevice(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    rebootApp () {
      this.$emit('update:loading', true)
      rebootAppDevice(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    uploadLog () {
      this.$emit('update:loading', true)
      uploadLogDevice(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    reset () {
      this.$emit('update:loading', true)
      resetDevice(this.id, this.dataForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    }
  },
  watch: {
    info (n, o) {
      this.assginFormData(n)
    }
  }
}
</script>
<style lang="scss" scoped>
.device-form-system{
  &-item{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #f0f0f0;
    &_name{
      font-size: 14px;
      color: #999999;
    }
  }
}
.btn{
  width: 100%;
}
</style>
