<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading='loading'>
      <el-form-item label="启用休眠" prop="timeControl">
        <el-switch
          v-model="ruleForm.timeControl"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="画面方向" prop="stateOrient">
        <el-select v-model="ruleForm.stateOrient" placeholder="请选择">
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="休眠时间" prop="timeClose">
        <el-time-picker v-model="ruleForm.timeClose" placeholder="任意时间点"></el-time-picker>
      </el-form-item>
      <el-form-item label="唤醒时间" prop="timeOpen">
        <el-time-picker v-model="ruleForm.timeOpen" placeholder="任意时间点"></el-time-picker>
      </el-form-item>
      <el-form-item label="媒体音量" prop="stateVolume">
        <el-slider
          v-model="ruleForm.stateVolume"
          :max='15'
          :step="1"
          show-stops>
      </el-slider>
      </el-form-item>
      <el-form-item label-width="0">
        <slot>
          <el-button class="btn" type="primary" @click="next">下一步
            <i class="iconfont icon-youhuaxiangyougengduo"></i>
          </el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { infoDevice, timeDevice, volumeDevice, directionDevice } from '@/api/device'
export default {
  name: 'device-form',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    id () {
      return this.info.id ? this.info.id : undefined
    }
  },

  data () {
    return {
      loading: false,
      ruleForm: {
        timeControl: '',
        timeClose: '',
        timeOpen: '',
        lightControl: 0,
        lightBrightness: '100',
        stateOrient: '',
        stateVolume: 10,
        stateLogo: '',
        stateInfo: ''
      },
      rules: {
      },
      orientOptions: [
        { value: 0, label: '横屏向右' },
        { value: 1, label: '竖屏向上' },
        { value: 8, label: '横屏向左' },
        { value: 9, label: '竖屏向下' }
      ]
    }
  },

  async mounted () {
    this.loading = true
    await this.getDeviceDetail()
    this.loading = false
  },

  methods: {
    assginFormData (obj) {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = obj[key]
      })
    },
    getDeviceDetail () {
      return infoDevice(this.id)
        .then(res => {
          this.assginFormData(res.data)
        })
        .catch(e => {
          this.$refs.ruleForm.resetFields()
        })
    },

    async setTimeControl () {
      this.loading = true
      await this.setTime()
      await this.getDeviceDetail()
      this.loading = false
    },

    async setStateOrient () {
      this.loading = true
      await directionDevice(this.id, this.ruleForm)
        .then(res => {
          this.message()
        })
        .catch(e => console.log(e))
      await this.getDeviceDetail()
      this.loading = false
    },

    async setTimeClose () {
      this.loading = true
      await this.setTime()
      await this.getDeviceDetail()
      this.loading = false
    },

    async setTimeOpen () {
      this.loading = true
      await this.setTime()
      await this.getDeviceDetail()
      this.loading = false
    },

    async setStateVolume () {
      this.loading = true
      await volumeDevice(this.id, this.ruleForm)
        .then(res => {
          this.message()
        })
        .catch(e => console.log(e))
      await this.getDeviceDetail()
      this.loading = false
    },

    setTime () {
      return timeDevice(this.id, this.ruleForm)
        .then(res => {
          this.message()
        })
        .catch(e => console.log())
    },

    message () {
      this.$message({
        message: '设置成功',
        type: 'success'
      })
    },

    next () {
      this.$emit('next')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn{
  width: 100%;
}
</style>
