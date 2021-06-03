<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 21:22:19
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:54:11
-->
<template>
  <video ref="videoPlayer"
    class="video-js vjs-default-skin vjs-big-play-centered video-player"
    preload='auto'
    autoplay
    muted
  >
    <source src="../assets/video/oceans.mp4" type="video/mp4" >
  </video>
</template>

<script>
import videojs from 'video.js'
export default {
  name: 'video-palyer',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    src () {
      return this.info.addressOld ? this.info.addressOld : '../assets/video/oceans.mp4'
    }
  },

  data () {
    return {
      player: {},
      defaultOptions: {
        autoplay: true, // 是否自动播放
        aspectRatio: '16:9',
        controls: true,
        fluid: true, // 宽高自适应
        techOrder: ['html5'],
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        language: 'zh'
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const options = Object.assign(this.defaultOptions, this.options)
      videojs.addLanguage('zh', {
        Play: '播放',
        Pause: '暂停',
        Duration: '时长',
        Replay: '重播',
        Fullscreen: '全屏',
        Unmute: '静音',
        Mute: '音量',
        'Non-Fullscreen': '退出全屏',
        'Picture-in-Picture': '画中画',
        'Current Time': '当前时间',
        'Remaining Time': '剩余时间 '
      })

      this.player = videojs(this.$refs.videoPlayer, options, () => {
        this.play()
      })
    },

    // 销毁video
    dispose () {
      if (this.player) {
        this.player.dispose()
      }
    },

    // 播放
    play () {
      if (this.player) {
        this.player.play()
      }
    },

    // 暂停
    pause () {
      if (this.player) {
        this.player.pause()
      }
    },

    // 重置
    reset () {
      if (this.player) {
        this.player.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player{
  width: 100%;
  height: 100%;
}
</style>
