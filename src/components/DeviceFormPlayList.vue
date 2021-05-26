<!--
 * @Description: 播放列表
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-26 19:01:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 22:38:54
-->
<template>
  <div class="play-list">
    <div class="play-list-item">
    <h3 class="play-list-item_title publish">已发布媒体</h3>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
    </div>
    <div class="play-list-item">
      <h3 class="play-list-item_title unpublish">未发布媒体</h3>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
      <card-media :info='info' class="media-screen"></card-media>
    </div>
  </div>
</template>

<script>
import CardMedia from './CardMedia'
export default {
  name: 'device-form-play-list',

  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },

  components: { CardMedia }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.play-list{
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-item{
    width: calc(50% - 10px);
    margin: 0 5px;
    background-color: #ffffff;
    overflow: auto;
    &_title{
      line-height: 30px;
      &::before{
        content: '';
        display: block;
        width: 5px;
        height: 30px;
        float: left;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
.play-list::after{
  content: '';
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.publish::before{
  @include bg-color('success');
}
.unpublish::before{
  @include bg-color('danger');
}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) {
  .media-screen{
    width: calc(33.33% - 20px);
  }
}
@media screen and (max-width: 1280px) {
  .media-screen{
    width: calc(50% - 20px);
  }
}
@media screen and (max-width: 920px) {
  .media-screen{
    width: calc(100% - 20px);
  }
}
</style>
