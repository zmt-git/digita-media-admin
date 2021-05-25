<!--
 * @Description: 用户基础信息component
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 11:16:26
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-21 11:36:17
-->
<template>
  <div class="item">
    <span class="item_name">{{label}}</span>
    <span class="item_colon">:</span>
    <span class="item_value">{{value}}</span>
  </div>
</template>
<script>
export default {
  name: 'header-user-info-list-item',
  props: {
    label: {
      type: String,
      default: '名称'
    },
    value: {
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  line-height: 30px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  &_name{
    width: 85px;
    height: 30px;
    text-align: justify;
    color: #7d7d82;
    overflow: hidden;
    display: inline-block;
  }
  &_name::after{
    content: '';
    width: 100%;
    display: inline-block;
  }
  &_colon{
    display: inline-block;
    overflow: hidden;
  }
  &_value{
    display: inline-block;
    height: 30px;
    color: #000;
    margin-left: 10px;
    overflow: hidden;
    font-size: 14px;
  }
}
</style>
