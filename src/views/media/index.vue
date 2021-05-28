<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 21:38:40
-->
<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      :infinite-scroll-disabled="disabled"
    >
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload='beforeUpload'
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <card-media @play='play' v-for="item in pageList" :key="item.id" :info='item'></card-media>
      <base-page-loading :loading='pageLoading' :noMore='noMore'></base-page-loading>
    </ul>
  </div>
</template>
<script>
import CardMedia from '@/components/CardMedia.vue'
import BasePageLoading from '@/components/BasePageLoading.vue'
import { listMedia } from '@/api/media'
import page from '@/mixins/page'
export default {
  name: 'media',

  components: { CardMedia, BasePageLoading },

  mixins: [page],

  data () {
    return {
      window: window,
      pageRequest: listMedia,
      mediaForm: {
        addressOld: '',
        length: 0,
        mediaType: -1,
        name: '',
        oldSize: 0
      }
    }
  },

  created () {
    this.pageLoad()
  },

  methods: {
    play (info) {
      this.$router.push({ path: '/media/detail', query: { info: info } })
    },
    add () {
      this.$router.push({ path: '/media/add' })
    },
    beforeUpload (file) {
      console.log(file)
      return file
    }
  }
}
</script>
