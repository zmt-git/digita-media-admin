<template>
  <div class="base-aside-card" :class="active ? 'active' : ''" @click="to">
    <i class="iconfont icon" :class="icon"></i>
    <span class="title ellipsis-1" :title="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'base-aside-card',

  props: {
    path: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    to () {
      this.$router.push(this.path)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.base-aside-card{
  width: 90px;
  height: 90px;
  margin: 0 5px;
  flex-shrink: 0;
  background: linear-gradient(135deg, transparent 5px, #4d638d 0) top left,
    linear-gradient(45deg, transparent 5px, #4d638d 0) bottom left,
    linear-gradient(-45deg, transparent 5px, #4d638d 0) bottom right,
    linear-gradient(-135deg, transparent 5px, #4d638d 0) top right;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all .3s;
}
.icon{
  font-size: 30px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 15px;
}
.title{
  font-size: 16px;
  line-height: 18px;
  width: 100%;
  text-align: center;
}
.active{
  // background: linear-gradient(135deg, transparent 5px, #ffffff 0) top left,
  //   linear-gradient(45deg, transparent 5px, #ffffff 0) bottom left,
  //   linear-gradient(-45deg, transparent 5px, #ffffff 0) bottom right,
  //   linear-gradient(-135deg, transparent 5px, #ffffff 0) top right;
  // background-size: 50% 50%;
  // background-repeat: no-repeat;
  // @include color('primary')
  color: #f5bf2d;
}
</style>
