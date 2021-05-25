<template>
  <div>
    <p v-show="loading">加载中...</p>
    <p v-show="noMore">没有更多了</p>
  </div>
</template>

<script>
export default {
  name: 'page-loading',

  props: {
    noMore: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
