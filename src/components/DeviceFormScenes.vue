
<template>
  <div class="device-form-scenes">
    <el-form status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
      <el-form-item label="画面方向" prop="stateOrient" v-if="hasStateOrient">
        <el-select v-model="stateOrient" placeholder="请选择" :style="style" :disabled='disabled' @change="setStateOrient">
          <el-option
            v-for="item in orientOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="切换场景" prop="scenes">
        <el-select v-model="ordernumber" placeholder="请选择" :style="style" :disabled='disabled' @change="setOrderNumber">
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
import { directionDevice, orderNumber } from '@/api/device'
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
    hasStateOrient () {
      return this.info.type === 'ELF-A'
    },
    id () {
      return this.info.id ? this.info.id : undefined
    },
    scenesOptions () {
      if (this.info.type && this.info.type.indexOf('-') >= 0) {
        const type = this.info.type.split('-').pop()
        return scenesOptions[type]
      }
      return scenesOptions.A
    }
  },

  data () {
    return {
      stateOrient: '',
      ordernumber: '',
      orientOptions: orientOptions,
      style: {
        width: '100%'
      }
    }
  },

  methods: {
    assginFormData (obj) {
      this.stateOrient = obj.stateOrient
      this.ordernumber = obj.playListNumber
    },

    async setStateOrient () {
      this.$emit('update:loading', true)

      await directionDevice(this.id, { deviceCode: this.info.code, devid: this.info.id, stateOrient: this.stateOrient })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    },

    async setOrderNumber () {
      this.$emit('update:loading', true)
      await orderNumber(this.id, { deviceCode: this.info.code, devid: this.info.id, playListNumber: this.ordernumber })
        .then(res => {
          this.prompt(res.state)
        })
        .catch(e => console.log(e))
      this.$emit('updateInfo')
    }
  },
  watch: {
    info: {
      handler: function (n, o) {
        this.assginFormData(n)
      },
      immediate: true
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
