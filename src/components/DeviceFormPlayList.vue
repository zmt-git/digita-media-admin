<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-06 17:42:45
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 22:28:35
-->
<template>
  <div class="play-list">
    <div class="play-list-header">
      <span class="scenes-img" :class="type"></span>
      <div class="scenes-info">
        <h3 class="scenes-info_title ellipsis-1">{{title}}</h3>
        <p class="scenes-info_des ellipsis-2">{{des}}</p>
      </div>
    </div>
    <div class="play-list-content clear">
      <card-play-list
        :info='item'
        v-for="item in playlist"
        :key='item.id'
        @deleteMedia='deleteMedia'
      ></card-play-list>
      <card-play-list
        isAdd
        @add='addPlaylist'
      ></card-play-list>
    </div>
  </div>
</template>

<script>
import CardPlayList from './CardPlayList.vue'
import { playlistType } from '@/data/common'

export default {
  components: { CardPlayList },

  name: 'play-lsit',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '',
      validator: (val) => {
        return playlistType.find(item => item.type === val)
      }
    }
  },

  computed: {
    title () {
      return playlistType.find(item => item.type === this.type).title
    },
    des () {
      return playlistType.find(item => item.type === this.type).des
    }
  },

  data () {
    return {
      playlist: [{ src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 },
        { src: '', length: 60 }
      ]
    }
  },

  methods: {
    deleteMedia (info) {

    },
    addPlaylist () {},

    updateInfo () {
      this.$emit('updateInfo', this.info)
    }
  }
}
</script>
<style lang="scss" scoped>
.play-list{
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-bottom: 16px;
  background-color: #ffffff;
  &-header{
    height: 80px;
    width: 100%;
    border-bottom: 2px solid #dcdfe6;
    display: flex;
    box-sizing: border-box;
    padding: 10px 10px 15px 10px;
  }
  &-content{
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
}

.scenes{
  font-size: 13px;
  display: flex;
  &-img{
    display: inline-block;
    width: 55px;
    height: 55px;
    background-image: url('../assets/common/weather.jpg');
    background-size: 190px;
    background-repeat: no-repeat;
  }
  &-info{
    flex: 1;
    margin-left: 18px;
    font-size: 13px;
    &_title{
      line-height: 30px;
      color: #4e4e4f;
    }
    &_des{
      line-height: 18px;
      color: #878788;
      font-size: 12px;
    }
  }
}
.sunny{
  background-position: -7px -5px;
}
.cloudy{
  background-position: -67px -5px;
}
.shade{
  background-position: -127px -5px;
}
.rain{
  background-position: -7px -66px;
}
.thundershower{
  background-position: -67px -66px;
}
.thundershower-hail{
  background-position: -127px -66px;
}
.rain-hail{
  background-position: -7px -128px;
}
.freezing-rain{
  background-position: -67px -128px;
}
.snow{
  background-position: -127px -128px;
}
.rain-snow{
  background-position: -7px -189px;
}
.fog{
  background-position: -67px -189px;
}
.heat{
  background-position: -127px -189px;
}
.cold{
  background-position: -7px -250px;
}
.gale{
  background-position: -67px -250px;
}
.hail{
  background-position: -127px -250px;
}
.sandstorm{
  background-position: -7px -312px;
}
.haze{
  background-position: -67px -312px;
}
.smoke{
  background-position: -127px -312px;
}
.unknown{
  background-position: -7px -382px;
}
</style>
