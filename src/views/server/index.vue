<template>
  <div class="server" v-loading='loading'>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
      <el-form-item label="服务器类型" prop="type" required>
        <el-select v-model="form.type" placeholder="请选择服务器类型" disabled style="width: 100%" clearable>
          <el-option :label="item.name" :value="item.value" v-for="item in typeOptions" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务器地址" prop="minioUrl" required clearable>
        <el-input v-model="form.minioUrl"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="minioAccessKey" required clearable>
        <el-input v-model="form.minioAccessKey"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="minioSecretKey" required clearable>
        <el-input type="password" v-model="form.minioSecretKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" size="small" @click="submitForm">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { serverType } from '@/data/common'
import { setMediaConfig, getMediaConfig } from '@/api/server'
export default {
  name: 'server',

  data () {
    return {
      loading: false,
      typeOptions: serverType,
      info: {},
      form: {
        type: 4,
        minioUrl: '',
        minioAccessKey: '',
        minioSecretKey: ''
      },
      rules: {}
    }
  },

  async mounted () {
    this.loading = true
    await this.getConfig()
    this.loading = false
  },

  methods: {
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.setConfig()
          await this.getConfig()
          this.loading = false
        } else {
          console.log('error submit')
        }
      })
    },

    getConfig () {
      return getMediaConfig()
        .then(res => {
          this.info = res.config
          Object.keys(this.form).forEach(key => {
            this.form[key] = this.info[key] !== undefined ? this.info[key] : ''
          })
        })
        .catch(e => console.log(e))
    },

    setConfig () {
      return setMediaConfig(this.form)
        .then(res => {
          this.$message({ message: '修改成功', type: 'success' })
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss" scoped>
.server{
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  width: 500px;
}
.btn{
  width: 100%;
}
</style>
