<template>
  <el-drawer
    title="媒体列表"
    direction="rtl"
    :size='400'
    :visible="visible"
    @close='close'
    @open='open'
    class="base-drawer-media"
  >
    <div class="content" :class="empty ? 'flex-center' : ''">
      <template v-for="item in playlist">
        <card-media-check :key="item.id" :info='item' :checkeArr.sync='checkeArr' :value='item.id'></card-media-check>
      </template>
      <template v-if="empty">
        <base-empty></base-empty>
      </template>
    </div>
    <div class="demo-drawer__footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add">添加</el-button>
    </div>
  </el-drawer>
</template>

<script>
import CardMediaCheck from './CardMediaCheck.vue'
import BaseEmpty from './BaseEmpty'
export default {
  name: 'base-drawer-media',

  components: { CardMediaCheck, BaseEmpty },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    playlist: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    empty () {
      return !this.playlist.length
    }
  },

  data () {
    return {
      checkeArr: []
    }
  },

  methods: {
    close () {
      this.$emit('update:visible', false)
    },

    open () {
      this.checkeArr = []
    },

    add () {
      const checkeArr = this.playlist.filter(item => this.checkeArr.includes(item.id))
      const uncheckeArr = this.playlist.filter(item => !this.checkeArr.includes(item.id))
      this.$emit('add', checkeArr, uncheckeArr)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-drawer-media{
  /deep/ .el-drawer{
    background-color: #f0f0f0;
  }
  /deep/ .el-drawer__body{
    display: flex;
    flex-direction: column;
  }
  /deep/ .demo-drawer__footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 0;
    border-top: 1px solid #fff;
    & button{
      width: 40%;
    }
  }
}
.content{
  box-sizing: border-box;
  padding: 1px 5px;
  flex: 1;
  overflow: auto;
}
</style>
