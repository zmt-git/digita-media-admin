<template>
  <div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="启用休眠" prop="timeControl" style="text-align: right;">
        <el-switch
          :disabled='disabled'
          v-model="ruleForm.timeControl"
          @change="setTimeControl"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="画面方向" prop="stateOrient">
        <el-select v-model="ruleForm.stateOrient" placeholder="请选择" :style="style" :disabled='disabled' @change="setStateOrient">
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="休眠时间" prop="timeClose">
        <el-time-picker v-model="ruleForm.timeClose" @change="setTimeClose"  placeholder="请选择休眠时间" :style="style" :disabled='disabled || disabledTime'></el-time-picker>
      </el-form-item>
      <el-form-item label="唤醒时间" prop="timeOpen">
        <el-time-picker v-model="ruleForm.timeOpen" @change="setTimeOpen" placeholder="请选择唤醒时间" :style="style" :disabled='disabled || disabledTime'></el-time-picker>
      </el-form-item>
      <el-form-item label="媒体音量" prop="stateVolume">
        <el-slider
          :disabled='disabled'
          v-model="ruleForm.stateVolume"
          :max='15'
          :step="1"
          @change="setTimeOpen"
          show-stops>
        </el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { timeDevice, volumeDevice, directionDevice } from '@/api/device'
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
      return !!this.ruleForm.timeControl
    }
  },

  data () {
    return {
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
      orientOptions: [
        { value: 0, label: '横屏向右' },
        { value: 1, label: '竖屏向上' },
        { value: 8, label: '横屏向左' },
        { value: 9, label: '竖屏向下' }
      ],
      style: {
        width: '300px'
      }
    }
  },

  async mounted () {
    this.assginFormData(this.info)
  },

  methods: {
    assginFormData (obj) {
      Object.keys(this.ruleForm).forEach(key => {
        this.ruleForm[key] = obj[key]
      })
    },

    async setTimeControl () {
      this.$emit('update:loading', true)
      await this.setTime()
      this.$emit('updateInfo')
    },

    async setStateOrient () {
      this.$emit('update:loading', true)

      await directionDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
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

    async setStateVolume () {
      this.$emit('update:loading', true)
      await volumeDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    setTime () {
      return timeDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log())
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
.btn{
  width: 100%;
}
</style>
