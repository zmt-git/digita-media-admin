<template>
  <div class="device-form-config">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="光源控制" prop="lightControl" style="text-align: right;">
        <el-switch
          :disabled='disabled'
          active-text="手动控制"
          inactive-text="时间控制"
          :active-value='1'
          :inactive-value='0'
          v-model="ruleForm.lightControl"
          @change="switchLight"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="光源开关" prop="lightBrightness" style="text-align: right;">
        <el-switch
          :disabled='disabled || disbledLigthSwitch'
          active-text="ON"
          inactive-text="OFF"
          :active-value='true'
          :inactive-value='false'
          v-model="lightSwitch"
          @change="modelLight"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="休眠时间" prop="timeClose">
        <el-time-picker v-model="ruleForm.timeClose" @change="setTimeClose"  placeholder="请选择休眠时间" format='HH:mm' value-format='HH:mm' :style="style" :disabled='disabled || disabledTime'></el-time-picker>
      </el-form-item>
      <el-form-item label="唤醒时间" prop="timeOpen">
        <el-time-picker v-model="ruleForm.timeOpen" @change="setTimeOpen" placeholder="请选择唤醒时间" format='HH:mm' value-format='HH:mm' :style="style" :disabled='disabled || disabledTime'></el-time-picker>
      </el-form-item>
      <!-- <el-form-item label="媒体音量" prop="stateVolume">
        <el-slider
          :disabled='disabled'
          v-model="ruleForm.stateVolume"
          :max='15'
          :step="1"
          @change="setTimeOpen"
          show-stops>
        </el-slider>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { timeDevice, lightDevice } from '@/api/device'
import prompt from '@/mixins/prompt'
export default {
  name: 'device-form-config',

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
    },
    disabledTime () {
      return this.ruleForm.lightControl === 1
    },
    disbledLigthSwitch () {
      return this.ruleForm.lightControl === 0
    }
  },

  data () {
    return {
      lightSwitch: false,
      ruleForm: {
        timeControl: '',
        timeClose: '00:00',
        timeOpen: '00:00',
        lightControl: 0,
        lightBrightness: 1,
        stateOrient: '',
        stateVolume: 10,
        stateLogo: '',
        stateInfo: ''
      },
      style: {
        width: '100%'
      }
    }
  },
  methods: {
    assginFormData (obj) {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = obj[key] !== undefined ? obj[key] : this.ruleForm[key]
      })
      console.log(this.ruleForm)
    },

    async setTimeControl () {
      this.$emit('update:loading', true)
      await this.setTime()
      this.$emit('updateInfo')
    },

    async setTimeClose () {
      this.$emit('update:loading', true)
      await this.setTime()
      this.$emit('updateInfo')
    },

    async setTimeOpen () {
      this.$emit('update:loading', true)
      await this.setTime()
      this.$emit('updateInfo')
    },

    setTime () {
      return timeDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log())
    },

    async switchLight () {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    async modelLight () {
      this.$emit('update:loading', true)
      await this.setLight()
      this.$emit('updateInfo')
    },

    setLight () {
      return lightDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
    }
  },
  watch: {
    info: {
      handler: function (n, o) {
        this.assginFormData(n)
        this.ruleForm.lightBrightness > 0 ? this.lightSwitch = true : this.lightSwitch = false
      },
      immediate: true
    },
    lightSwitch (newVal, oldVal) {
      if (newVal) {
        this.ruleForm.lightBrightness = 100
      } else {
        this.ruleForm.lightBrightness = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.device-form-config{
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  /deep/ .el-switch__label{
    width: 56px;
  }
  /deep/ .el-switch__label--right{
    text-align: left;
  }
}
.btn{
  width: 100%;
}
</style>
