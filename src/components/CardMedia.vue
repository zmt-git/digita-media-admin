<template>
  <li class="detail-media box-shadow radius-10"  @mouseleave="showPlay(false)" @mouseenter="showPlay(true)">
      <div class="detail-media-src">
        <el-tag v-if="state && tag" class="state-btn"  effect="dark" :type="btnType" size="mini">{{btnName}}</el-tag>
        <!-- <span class="iconfont media-type" :class="mediaType"></span> -->
        <img
          class="detail-media-src_img"
          :src="img" />
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
        <div class="detail-media-info-item">
          <span class="detail-media-info_text font-color">{{mediaName}}</span>
          <span class="detail-media-info_text font-color">{{mediaType}}</span>
        </div>
        <div class="detail-media-info-item">
          <span class="detail-media-info_text font-color">
            <span class="iconfont icon-length" :class="mediaIcon"></span>{{oldSize}}
          </span>
          <transition enter-active-class="animate__fadeIn animate__animated " leave-active-class="animate__fadeOut animate__animated ">
            <el-button v-show="deleteShow" class="btn" type="danger" size="mini" icon="el-icon-delete" @click="deleteMedia"></el-button>
          </transition>
        </div>
      </div>
  </li>
</template>

<script>
import { secondFormat } from '@/utils/tools/dateTool'
export default {
  name: 'detail-media',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    tag: {
      type: Boolean,
      default: true
    },
    isAddCard: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    img () {
      return this.info.addressOld ? this.info.addressOld : require('../assets/layout/header/empty.png')
    },
    mediaName () {
      return this.info.mediaType === 0 ? '视频媒体' : '图片媒体'
    },
    mediaType () {
      if (this.info.mediaType === 0) {
        return 'MP4'
      } else if (this.info.mediaType === 1) {
        return 'JPG'
      } else {
        return 'PNG'
      }
    },
    mediaIcon () {
      return this.info.mediaType === 0 ? 'icon-icon_moments_mp4' : 'icon-tupian1'
    },
    oldSize () {
      return this.info.oldSize ? this.info.oldSize + 'KB' : '0KB'
    },
    state () {
      return this.info && this.info.state !== 1
    },
    btnType () {
      return this.getState(this.info.state).type
    },
    btnName () {
      return this.getState(this.info.state).name
    }
  },

  data () {
    return {
      show: false,
      deleteShow: false
    }
  },

  methods: {
    showPlay (show) {
      this.deleteShow = show
      if (this.info.mediaType !== 0) return
      this.show = show
    },
    play () {
      this.$emit('play', this.info)
    },
    deleteMedia () {
      this.$emit('delete', this.info)
    },
    getTime () {
      return secondFormat(this.info.oldSize)
    },
    add () {
      this.$emit('add')
    },
    getState (state) {
      // -1：删除，0，审核中，-2，审核失败，1：正常；
      let obj = { name: '审核中', type: 'primary' }
      switch (state) {
        case 0: obj = { name: '审核中', type: 'primary' }
          break
        case -2: obj = { name: '审核失败', type: 'warning' }
          break
      }
      return obj
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
$iconColor: #ffffff;
.detail-media{
  float: left;
  margin: 10px;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid transparent;
  transition: border-color .5s;
  &-src{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 320px;
    max-height: 180px;
    &_img{
      max-width: 320px;
      max-height: 180px;
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
    padding: 0 10px 5px 10px;
    border-top: 1px solid #f0f0f0;
    &-item{
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &_text{
      font-size: 12px;
      display: flex;
      align-items: center;
    }
  }
}
.btn{
  font-size: 10px;
  padding: 3px 5px;
}

.state-btn{
  position: absolute;
  top: 10px;
  right: 10px;
}
.icon-length{
  margin-right: 5px;
  font-size: 20px;
}
</style>
