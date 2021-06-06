<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-06 19:03:26
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-06 22:51:45
-->
<template>
  <div class="card-play-list" :class="isAdd ? 'flex-center' : ''" @click="add">
    <template v-if="!isAdd">
      <div class="media">
        <i class="iconfont icon-zuo media_icon" ></i>
        <div class="media_box">
          <img class="media_img" :src="src" alt="媒体图片">
        </div>
        <i class="iconfont icon-you media_icon"></i>
      </div>
      <div class="info">
        <span>
          <span class="info_name">播放时长</span>
          <el-input-number size="mini" :max="99" :min="1" :value="length"></el-input-number>
          <span class="second">秒</span>
        </span>
        <el-button class="btn" type="danger" size="mini" icon="el-icon-delete" @click="deleteMedia"></el-button>
      </div>
    </template>
    <template v-else>
      <i class="iconfont add icon-jia"></i>
    </template>
  </div>
</template>

<script>
export default {
  name: 'card-play-list',

  props: {
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

  computed: {
    src () {
      return !this.isAdd && this.info.addressOld ? this.info.addressOld : require('../assets/device/empty.png')
    }
  },

  methods: {
    deleteMedia () {
      this.$emit('deleteMedia', this.info)
    },
    add () {
      if (!this.isAdd) return
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-play-list{
  width: 265px;
  height: 165px;
  float: left;
  box-sizing: border-box;
  border: 1px solid #cecece;
  border-radius: 5px;
  margin: 0px 15px 15px 0;
  display: flex;
  flex-direction: column;
}
.media{
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px;
  &_box{
    flex: 1;
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
    max-width: 200px;
    max-height: 120px;
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
</style>
