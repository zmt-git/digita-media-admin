<template>
  <div class="tagView">
    <span
      class="tagView-item"
      v-for="tag in visitedViews"
      :key="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      @click="to(tag)"
    >
      {{ tag.title }}
      <i
        v-show="isNotIndex(tag)"
        class="iconfont icon-error icon"
        @click.self.stop="delTag(tag)"
      ></i>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tag-view',

  computed: {
    ...mapGetters(['visitedViews', 'routes'])
  },

  methods: {
    isNotIndex(tag) {
      return tag.path !== '/device/deviceList'
    },

    isActive(route) {
      return route.path === this.$route.path
    },

    to(tag) {
      if (this.$route.path === tag.path) return
      this.$router.push({ path: tag.path, query: tag.query })
    },

    delTag(route) {
      this.$store.dispatch('delViews', route)
      const tag = this.visitedViews[this.visitedViews.length - 1]
      this.$router.push({ path: tag.path, query: tag.query })
    }
  },

  watch: {
    $route: {
      handler: function(to) {
        this.$store.dispatch('addViews', to)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.tagView {
  flex: 1;
  height: 100%;
  min-height: 35px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: auto;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  padding: 0 5px;
  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
  }
  &::-webkit-scrollbar {
    height: 3px;
  }
  &-item {
    flex-shrink: 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-right: 5px;
    padding-right: 20px;
  }
}
.icon {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.active {
  @include bg-color('success');
  color: #ffffff;
  &::before {
    content: '';
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
}
</style>
