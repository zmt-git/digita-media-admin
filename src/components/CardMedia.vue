<template>
  <li class="detail-media box-shadow radius-10"  @mouseleave="showPlay(false)" @mouseenter="showPlay(true)">
    <template v-if="!isAddCard">
      <span v-if="index" class="index">{{index}}</span>
      <div class="detail-media-src">
        <el-tag v-if="state && tag" class="state-btn" effect="dark" :type="btnType" size="mini">{{btnName}}</el-tag>
        <el-image
          fit='contain'
          v-if="info.mediaType !== 0"
          class="detail-media-src_img"
          :src="img"
          :preview-src-list="[img]">
        </el-image>
        <template v-else>
          <video-player :info='info' :autoplay='false' :options='{ autoplay: false, controls: false}'></video-player>
        </template>
        <transition
          enter-active-class="animate__fadeIn animate__animated"
          leave-active-class="animate__fadeOut animate__animated"
        >
          <div v-show="show" class="detail-media-src-mask" @click="showDialog">
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
    </template>
    <template>
      <slot></slot>
    </template>
    <template v-if="dialogVisible">
      <el-dialog
        title="视频媒体"
        :visible.sync="dialogVisible"
        @close='close'
        @open='open'
        width="640px">
        <span>
          <video-player ref='videoPlayer' :info='info'></video-player>
        </span>
      </el-dialog>
    </template>
  </li>
</template>

<script>
import { secondFormat } from '@/utils/tools/dateTool'
import media from '@/mixins/media'
import VideoPlayer from './VideoPlayer.vue'

export default {
  components: { VideoPlayer },
  name: 'detail-media',

  mixins: [media],

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
    },
    index: {
      index: Number,
      default: 0
    }
  },

  computed: {
    img () {
      return !this.isAddCard && this.info.address ? this.info.address : require('../assets/common/empty.png')
    }
  },

  data () {
    return {
      show: false,
      deleteShow: false,
      dialogVisible: false
    }
  },

  methods: {
    close () {
      this.$refs.videoPlayer.dispose()
    },

    open () {
      this.$nextTick(() => {
        this.$refs.videoPlayer.init()
      })
    },

    showPlay (show) {
      if (this.isAddCard) return
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

    showDialog () {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
$iconColor: #ffffff;
.detail-media{
  display: inline-block;
  margin: 9px;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid transparent;
  transition: border-color .5s;
  position: relative;
  &-src{
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
    height: 180px;
    cursor: pointer;
    &_img{
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
  padding: 2px 5px;
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
.index{
  position: absolute;
  top: 2px;
  left: 2px;
  display: inline-block;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
  border-radius: 50%;
  @include color('danger');
  @include bg-color('info-plain')
}
@media screen and (min-width: 1440px) {
  .detail-media{
    width: calc(20% - 20px);
  }
}
@media screen and (max-width: 1440px) {
  .detail-media{
    width: calc(25% - 20px);
  }
}
@media screen and (max-width: 1280px) {
  .detail-media{
    width: calc(33.33% - 20px);
  }
}
@media screen and (max-width: 960px) {
  .detail-media{
    width: calc(50% - 20px);
  }
}
@media screen and (max-width: 600px) {
  .detail-media{
    width: calc(100% - 20px);
  }
}
</style>
