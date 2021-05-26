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
      this.$router.push({ path: '/media/detail', query: { info: info } })
    }
  }
}
</script>
