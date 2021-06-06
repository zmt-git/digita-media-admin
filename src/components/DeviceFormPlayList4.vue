<!--
 * @Description: 播放列表
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-02 22:46:05
-->
<template>
  <div class="play-list clear">
    <div class="play-list-item" :class="disabled ? 'disabled-bg' : ''">
      <base-title type='success'>已发布媒体</base-title>
      <base-empty v-if="publishList.length === 0"></base-empty>
      <draggable  v-model="publishList" @add='onAddUnpublish' @update='update("publish")' :disabled="disabled" chosenClass="chosen" forceFallback group="people" animation="1000" class="play-list-item-content">
        <template v-for="info in publishList">
          <card-media :index='info.sort' v-if="info.state !== -1" :info='info' :tag='false' :class="mediaClass" :key='info.id'  @delete='deletePlaylistByIds'></card-media>
        </template>
      </draggable>
    </div>
    <div class="play-list-item" :class="disabled ? 'disabled-bg' : ''">
      <base-title type='error'>未发布媒体</base-title>
      <base-empty v-if="unpublishList.length === 0"></base-empty>
      <draggable  v-model="unpublishList" @add='onAddPublish' @update='update("unpublish")' :disabled="disabled" chosenClass="chosen" forceFallback group="people" animation="1000" class="play-list-item-content">
        <template v-for="info in unpublishList">
          <card-media :index='info.sort' v-if="info.state !== -1" :info='info' :tag='false' :class="mediaClass" :key='info.id' @delete='deletePlaylistByIds'></card-media>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import BaseTitle from './BaseTitle'
import CardMedia from './CardMedia'
import draggable from 'vuedraggable'
import { allListPlaylist, deletePlaylist } from '@/api/playList'
import prompt from '@/mixins/prompt'
import BaseEmpty from './BaseEmpty.vue'
export default {
  name: 'device-form-play-list',

  props: {
    info: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: true
    },
    mediaClass: {
      type: String,
      default: 'media-screen'
    }
  },

  mixins: [prompt],

  components: { CardMedia, draggable, BaseTitle, BaseEmpty },

  computed: {
    id () {
      return this.info.id ? this.info.id : undefined
    },
    length () {
      return this.publishList.length
    }
  },

  data () {
    return {
      ids: [],
      publishList: [],
      unpublishList: []
    }
  },

  async mounted () {
    this.$emit('update:loading', true)
    await this.getAllList()
    this.$emit('update:loading', false)
  },

  methods: {
    update (type) {
      if (type === 'publish') {
        this.changeSort(this.publishList)
      } else {
        this.changeSort(this.unpublishList, this.length)
      }
    },

    onAddUnpublish (item) {
      const target = this.publishList[item.newIndex]
      target.state = 0
      this.changeSort(this.publishList)
    },

    onAddPublish (item) {
      const target = this.unpublishList[item.newIndex]
      target.state = 1
      this.changeSort(this.unpublishList, this.length)
    },

    changeSort (arr, accumulator = 0) {
      arr.forEach((item, index) => {
        item.sort = index + 1 + accumulator
      })
    },

    deletePlaylistByIds (info) {
      this.$confirm('在播放列表中删除该媒体吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        info.state = -1
      }).catch(() => {

      })
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

    getAllList () {
      if (!this.id) return
      return allListPlaylist(this.id)
        .then(res => {
          this.publishList = res.list.filter(item => item.state === 1).sort((a, b) => a.sort - b.sort)
          this.unpublishList = res.list.filter(item => item.state === 0)
        })
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.play-list{
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  &-item{
    width: calc(50% - 10px);
    height: 100%;
    margin: 0 5px;
    box-sizing: border-box;
    border: 1px solid #fff;
    padding: 10px 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    &-content{
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar-thumb{
        background-color: #d0d0d0;
      }
      &::-webkit-scrollbar{
        width: 3px;
      }
    }
  }
}
.chosen{
  @include border-color('danger');
}
.disabled-bg{
  background-color: #fafafa;
}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) {
  .media-screen{
    width: calc(33% - 23px);
  }
}
@media screen and (max-width: 1280px) {
  .media-screen{
    width: calc(50% - 23px);
  }
}
@media screen and (max-width: 920px) {
  .media-screen{
    width: calc(100% - 23px);
  }
}
</style>
