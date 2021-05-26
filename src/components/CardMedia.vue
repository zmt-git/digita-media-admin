<template>
  <li class="detail-media box-shadow radius-10">
    <div class="detail-media-src" @mouseleave="showPlay(false)" @mouseenter="showPlay(true)">
      <img
        class="detail-media-src_img"
        :src="img"
        alt="视频">
      <transition
        enter-active-class="animate__fadeIn animate__animated"
        leave-active-class="animate__fadeOut animate__animated"
      >
        <div v-show="show" class="detail-media-src-mask" @click="play">
          <i class="detail-media-src-mask_icon iconfont icon-bofang center"></i>
        </div>
      </transition>
    </div>
    <div class="detail-media-info">
      <h3 class="detail-media-info_name font-color ellipsis-1">520视频</h3>
      <h6 class="detail-media-info_time font-color ellipsis-1">2021-05-20</h6>
    </div>
  </li>
</template>

<script>
export default {
  name: 'detail-media',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    img () {
      return this.info.img ? this.info.img : require('../assets/layout/header/empty.png')
    }
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    showPlay (show) {
      this.show = show
    },
    play () {
      this.$emit('play', this.info)
    }
  }
}
</script>
<style lang="scss" scoped>
$iconColor: #ffffff;
.detail-media{
  float: left;
  margin: 10px;
  background-color: #ffffff;
  overflow: hidden;
  &-src{
    position: relative;
    &_img{
      width: 100%;
      border: 0;
      cursor: pointer;
    }
    &-mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.2);
      cursor: pointer;
      &:hover &_icon{
        transform: scale(1.5);
      }
      &_icon{
        font-size: 50px;
        color: $iconColor;
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: all .5s;
      }
    }
  }
  &-info{
    width: 320px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0px;
    border-top: 1px solid #f0f0f0;
    & h3, h4{
      line-height: 30px;
    }
    &_name{
      font-size: 15px;
    }
    &_time{
      font-size: 12px;
    }
  }
}

</style>
