<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      :infinite-scroll-disabled="disabled"
    >
      <detail-media @play='play' v-for="item in pageList" :key="item.id"></detail-media>
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
      pageRequest: listMedia
    }
  },

  created () {
    this.pageLoad()
  },

  methods: {
    play (info) {

    }
  }
}
</script>
