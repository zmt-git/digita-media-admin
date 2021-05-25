<!--
 * @Description: 媒体播放页面
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 21:41:52
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 22:09:22
-->
<template>
  <div>
    <div class="info">
      <el-button @click="back">返回</el-button>
    </div>
    <div class="video-container">
      <video-player :info='info'></video-player>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'
export default {
  name: 'media-player',

  components: { VideoPlayer },

  data () {
    return {
      info: {}
    }
  },

  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.video-container{
  max-width: 1416px;
  min-width: 1080px;
}
</style>
