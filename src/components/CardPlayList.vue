<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-06 19:03:26
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 22:51:45
-->
<template>
  <div class="card-play-list" :class="[disabled ? 'disabled' : '', isAdd ? 'flex-center' : '']" @click="add">
    <template v-if="!isAdd">
      <div class="media">
        <i class="iconfont icon-zuo media_icon" :class="disabled ? 'disabled' : ''" title="左移" @click="move('left')"></i>
        <div class="media_box">
          <el-image
            fit='contain'
            class="media_img"
            :src="url"
            :preview-src-list="[url]">
            <div slot="error" class="image-slot">
              <i class="error-img_icon el-icon-picture-outline"></i>
            </div>
          </el-image>
          <!-- <img class="media_img" :src="url" alt="媒体图片"> -->
        </div>
        <i class="iconfont icon-you media_icon" :class="disabled ? 'disabled' : ''" title="右移" @click="move('right')"></i>
      </div>
      <div class="info">
        <span>
          <span class="info_name">时长</span>
          <el-input-number :disabled='disabled' size="mini" :max="99" :min="1" :value="length" @change="onchange"></el-input-number>
          <span class="second">秒</span>
        </span>
        <el-button class="btn" :disabled='disabled' type="danger" size="mini" icon="el-icon-delete" @click="deleteMedia"></el-button>
      </div>
    </template>
    <template v-else>
      <i class="iconfont add icon-jia" :class="disabled ? 'disabled' : ''"></i>
    </template>
  </div>
</template>

<script>
import { infoMedia } from '@/api/media'
export default {
  name: 'card-play-list',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    length: {
      type: Number,
      default: 0
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      timmer: null,
      url: ''
    }
  },

  created () {
    console.log(12)
    if (this.isAdd) return
    this.getMediaUrl()
  },

  methods: {
    getMediaUrl () {
      return infoMedia(this.info.mediaId)
        .then(res => {
          this.url = res.data.address
        })
        .catch(e => {
          console.log(e)
        })
    },
    deleteMedia () {
      this.$emit('deleteMedia', this.info)
    },
    add () {
      if (!this.isAdd || this.disabled) return
      this.$emit('add')
    },
    move (direction) {
      if (this.disabled) return
      this.$emit('move', direction, this.info)
    },

    onchange (e) {
      this.$emit('update:length', e)
      this.timmer && clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        clearTimeout(this.timmer)
        this.$emit('setLength', this.info, e)
        this.timmer = null
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-play-list{
  height: 165px;
  float: left;
  box-sizing: border-box;
  border: 1px solid #cecece;
  border-radius: 5px;
  margin: 15px;
  display: flex;
  flex-direction: column;
}
.media{
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px;
  overflow: hidden;
  &_box{
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_icon{
    color: #606266;
    font-size: 18px;
    cursor: pointer;
  }
  &_img{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.info{
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  &_name{
    font-size: 13px;
    color: #4e4e4f;
    margin-right: 10px;
  }
  /deep/ .el-input-number--mini{
    width: 100px;
    line-height: 22px;
    & .el-input__inner{
      height: 24px;
      line-height: 24px;
    }
  }
}
.second{
  font-size: 13px;
  color: #4e4e4f;
  margin-left: 5px;
}
.flex-center{
  text-align: center;
  cursor: pointer;
}

.add{
  font-size: 30px;
  color: #4e4e4f;
  line-height: 165px;
}
.btn{
  font-size: 10px;
  padding: 2px 5px;
}
.disabled{
  cursor: no-drop;
}

@media screen and (min-width: 1600px) {
  .card-play-list{
    width: calc(20% - 30px);
  }
}
@media screen and (max-width: 1600px) {
  .card-play-list{
    width: calc(25% - 30px);
  }
}
@media screen and (max-width: 1400px) {
  .card-play-list{
    width: calc(33.33% - 30px);
  }
}
@media screen and (max-width: 1160px) {
  .card-play-list{
    width: calc(50% - 30px);
  }
}
@media screen and (max-width: 960px) {
  .card-play-list{
    width: calc(100% - 30px);
  }
}
</style>
