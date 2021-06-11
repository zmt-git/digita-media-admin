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
      <span class="scenes-img" :class="[type, scenes]"></span>
      <div class="scenes-info">
        <h3 class="scenes-info_title ellipsis-1">{{title}}</h3>
        <p class="scenes-info_des ellipsis-2">{{des}}</p>
      </div>
    </div>
    <div class="play-list-content clear">
      <draggable v-model="scenesList"
        ref="draggable"
        chosenClass="chosen"
        forceFallback
        :disabled="disabled"
        :group="type"
        :touchStartThreshold='0'
        @end='end'
      >
      <transition-group name="cell" tag="div">
        <card-play-list
          v-for="item in scenesList"
          :key='item.mediaId'
          :info='item'
          :length.sync='item.mediaTime'
          :disabled="disabled"
          @deleteMedia='deleteMedia'
          @move='move'
          @setLength='setLength'
        ></card-play-list>
      </transition-group>
      </draggable>
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
import draggable from 'vuedraggable'
export default {
  components: { CardPlayList, draggable },

  name: 'play-lsit',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    playlist: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
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
      default: ''
    },
    scenes: {
      type: String,
      default: '',
      validator: (val) => {
        return !!playlistType[val]
      }
    }
  },

  computed: {
    title () {
      return playlistType[this.scenes].find(item => item.type === this.type).title
    },
    des () {
      return playlistType[this.scenes].find(item => item.type === this.type).des
    },
    length () {
      return this.scenesList.length
    }
  },

  data () {
    return {
      visible: false,
      target: null,
      scenesList: []
    }
  },

  methods: {
    deleteMedia (info) {
      this.$confirm('在播放列表中删除该媒体吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.scenesList.findIndex(item => item.mediaId === info.mediaId)
        if (index >= 0) {
          this.scenesList.splice(index, 1)
          this.updatePlaylist()
        }
      }).catch(() => {

      })
    },

    updateInfo () {
      this.$emit('updateInfo', this.info)
    },

    addPlaylist () {
      this.$emit('addPlaylist', this.index)
    },

    async setLength (target, value) {
      this.updatePlaylist()
    },

    move (direction, target) {
      const currentIndex = this.scenesList.indexOf(target)
      if (direction === 'right' && currentIndex < this.length) {
        const nextItem = this.scenesList[currentIndex + 1]
        this.scenesList.splice(currentIndex, 2, nextItem, target)
      } else if (direction === 'left' && currentIndex !== 0) {
        const nextItem = this.scenesList[currentIndex - 1]
        this.scenesList.splice(currentIndex - 1, 2, target, nextItem)
      }

      this.updatePlaylist()
    },

    end () {
      this.updatePlaylist()
    },

    updatePlaylist () {
      this.$emit('updatePlaylist', this.scenesList, this.index)
    }
  },

  watch: {
    playlist: {
      handler: function (newVal, oldVal) {
        try {
          this.scenesList = JSON.parse(newVal[this.index].content)
        } catch (e) {
          this.scenesList = []
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
@import '~@/styles/scenes.scss';
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
.chosen{
  @include border-color('danger');
}
.cell-move {
  transition: transform 1s;
}
</style>
