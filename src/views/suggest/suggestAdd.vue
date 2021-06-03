<template>
  <div class="suggest" v-loading='loading'>
    <div class="suggest-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="提交类型" required>
          <el-row :gutter="20">
            <el-col :span="5" v-for="item in suggestType" :key="item.value">
              <card-sugget-type :value='item.value' :title="item.title" :des='item.des' :check.sync='form.type'></card-sugget-type>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="标题" required prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" required prop="product">
          <el-input v-model="form.product"></el-input>
        </el-form-item>
        <el-form-item label="问题描述" required prop="des">
          <el-input v-model="form.des" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <!-- <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            action=""
            :file-list="fileList"
            :auto-upload="false"
            :http-request='submit'
            list-type="picture">
            <el-button size="small">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" size="small" @click="submitSuggest">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CardSuggetType from '@/components/CardSuggetType.vue'
import { SuggestType } from '@/data/common'
import { saveSuggest } from '@/api/suggest'
import { mapGetters } from 'vuex'
export default {
  name: 'suggest-add',

  components: { CardSuggetType },

  computed: {
    ...mapGetters(['user'])
  },

  data () {
    return {
      loading: false,
      suggestType: SuggestType,
      form: {
        type: 1,
        title: '',
        product: '',
        des: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写标题(最大长度为50)', max: 50, min: 1, trigger: 'blur' }
        ],
        product: [
          { required: true, message: '请填写产品名称', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '请具体描述问题', trigger: 'blur' }
        ]
      },
      params: {
        content: '',
        userId: ''
      }
    }
  },

  methods: {
    submitSuggest () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const type = SuggestType.find(item => item.value === this.form.type).title
          this.params.content = `${type}&${this.form.title}&${this.form.product}&${this.form.des}`
          this.params.userId = this.user.userId
          this.loading = true
          await this.suggestRequest()
          this.loading = false
        } else {
          console.log('error submit')
        }
      })
    },

    suggestRequest () {
      return saveSuggest(this.params)
        .then(res => {
          this.$message({ type: 'success', message: '您宝贵的意见我们已记录成功' })
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest{
  background-color: #fff;
  &-form{
    width: 80%;
    height: 100%;
  }
}
</style>
