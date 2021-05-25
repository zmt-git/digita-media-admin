<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:53:27
-->
<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      :infinite-scroll-disabled="disabled"
    >
      <detail-media @play='play' v-for="item in pageList" :key="item.id" :info='item'></detail-media>
      <page-loading :loading='pageLoading' :noMore='noMore'></page-loading>
    </ul>
  </div>
</template>
<script>
import DetailMedia from '@/components/DetailMedia.vue'
import PageLoading from '@/components/PageLoading.vue'
import { listMedia } from '@/api/media'
import page from '@/mixins/page'
export default {
  name: 'media',

  components: { DetailMedia, PageLoading },

  mixins: [page],

  data () {
    return {
      pageRequest: listMedia,
      pageList: [
        { id: 1, name: 12 }
      ]
    }
  },

  created () {
    this.pageLoad()
  },

  methods: {
    play (info) {
      this.$router.push({ path: '/media/player', query: { info: info } })
    }
  }
}
</script>
