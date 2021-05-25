<!--
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-25 20:37:16
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 22:27:06
-->
<template>
  <div class="container">
    <detail-device :info='item' v-for="item in pageList" :key='item.id'></detail-device>
  </div>
</template>
<script>
import DetailDevice from '@/components/DetailDevice.vue'
import page from '@/mixins/page'
export default {
  name: 'device',

  components: { DetailDevice },

  mixins: [page],

  data () {
    return {
      pageList: [
        { id: 1, name: 12, stateOnline: 1 },
        { id: 1, name: 12 },
        { id: 1, name: 12 },
        { id: 1, name: 12 },
        { id: 1, name: 12 },
        { id: 1, name: 12 },
        { id: 1, name: 12 }
      ]
    }
  }
}
</script>
