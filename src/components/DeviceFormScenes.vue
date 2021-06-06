
<template>
  <div class="device-form-scenes">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
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
      <el-form-item label="切换场景" prop="scenes">
        <el-select v-model="ruleForm.scenes" placeholder="请选择" :style="style" :disabled='disabled' @change="setScenes">
          <el-option
            v-for="item in scenesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { directionDevice, scenesDevice } from '@/api/device'
import { orientOptions, scenesOptions } from '@/data/common'
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
        stateInfo: '',
        scenes: ''
      },
      scenesOptions: scenesOptions,
      orientOptions: orientOptions,
      style: {
        width: '100%'
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
    async setStateOrient () {
      this.$emit('update:loading', true)

      await directionDevice(this.id, this.ruleForm)
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    async setScenes () {
      this.$emit('update:loading', true)
      await scenesDevice(this.id, this.ruleForm)
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
.device-form-scenes{
  padding-top: 10px;
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
}
.btn{
  width: 100%;
}
</style>
