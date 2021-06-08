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
      <draggable v-model="publishList"
        ref="draggable"
        chosenClass="chosen"
        forceFallback
        :disabled="disabled"
        :group="type"
        :touchStartThreshold='0'
      >
      <transition-group name="cell" tag="div">
        <card-play-list
          :key='item.id'
          v-for="item in publishList"
          :info='item'
          :length.sync='item.length'
          :disabled="disabled"
          @deleteMedia='deleteMedia'
          @move='move'
          @setLength='setLength'
        ></card-play-list>
      </transition-group>
      </draggable>
      <card-play-list
        isAdd
        @add='showDrawer'
      ></card-play-list>
    </div>
    <base-drawer-media :visible.sync='visible' :playlist="unpublishList" @add='addPlaylist'></base-drawer-media>
  </div>
</template>

<script>
import CardPlayList from './CardPlayList.vue'
import BaseDrawerMedia from './BaseDrawerMedia.vue'

import { playlistType } from '@/data/common'
import draggable from 'vuedraggable'
import { lengthMedia } from '@/api/media'
import { allListPlaylist, deletePlaylist } from '@/api/playList'
export default {
  components: { CardPlayList, draggable, BaseDrawerMedia },

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
      return this.publishList.length
    },
    id () {
      return this.info.id
    }
  },

  data () {
    return {
      visible: false,
      target: null,
      publishList: [{ id: 1, src: '', length: 61 },
        { id: 2, src: '', length: 62 },
        { id: 3, src: '', length: 63 },
        { id: 4, src: '', length: 64 },
        { id: 5, src: '', length: 65 },
        { id: 6, src: '', length: 66 },
        { id: 7, src: '', length: 67 },
        { id: 9, src: '', length: 68 }
      ],
      unpublishList: [
        { id: 1, src: '', length: 61, mediaType: 1, oldSize: 30 },
        { id: 2, src: '', length: 61, mediaType: 0, oldSize: 30 }
      ]
    }
  },

  mounted () {
    this.getPlayList()
  },

  methods: {
    deleteMedia (info) {
      this.$confirm('在播放列表中删除该媒体吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        info.state = -1
      }).catch(() => {

      })
    },

    showDrawer () {
      this.visible = true
    },

    addPlaylist (publishList, unpublishList) {
      this.publishList = this.publishList.concat(publishList)
      this.unpublishList = unpublishList
    },

    updateInfo () {
      this.$emit('updateInfo', this.info)
    },

    getPlayList () {
      return allListPlaylist(this.id)
        .then(res => {
          this.publishList = res.list.filter(item => item.state === 1).sort((a, b) => a.sort - b.sort)
          this.unpublishList = res.list.filter(item => item.state === 0)
        })
    },

    async setLength (target, value) {
      this.$emit('update:loading', true)
      await lengthMedia({ id: target.id, length: value })
        .then(res => {
          this.$message({ type: 'success', message: '设置成功' })
        })
        .catch(e => console.log(e))
      this.$emit('update:loading', false)
    },

    getSortParams () {
      const arr = this.publishList.concat(this.unpublishList)

      const params = []

      arr.forEach(item => {
        const obj = {}
        obj.id = item.id
        obj.sort = item.sorts
        obj.state = item.state
        params.push(obj)
      })

      return JSON.stringify(params).slice(1, -1)
    },

    async updateList (info) {
      const params = this.getSortParams()
      this.$emit('update:loading', true)
      await deletePlaylist({ playlistArr: params })
        .then(res => {
          this.prompt(res.state)
          return true
        })
        .catch(e => {
          console.log(e)
          return false
        })
      this.$emit('update:loading', false)
    },

    move (direction, target) {
      const currentIndex = this.publishList.indexOf(target)
      if (direction === 'right' && currentIndex < this.length) {
        const nextItem = this.publishList[currentIndex + 1]
        this.publishList.splice(currentIndex, 2, nextItem, target)
      } else if (direction === 'left' && currentIndex !== 0) {
        const nextItem = this.publishList[currentIndex - 1]
        this.publishList.splice(currentIndex - 1, 2, target, nextItem)
      }
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
