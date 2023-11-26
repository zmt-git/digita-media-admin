<template>
  <div class="aside-card">
    <router-link to="/device">
      <span class="plate-img"></span>
    </router-link>
    <!-- :active='route.parentPath + "/" + route.path === $route.path' -->
    <base-aside-card
      v-for="route in routesChildren"
      :path='route.parentPath + "/" + route.path'
      :key='route.path'
      :title="route.meta.title"
      :icon='route.meta.icon'>
    </base-aside-card>
  </div>
</template>

<script>
import BaseAsideCard from '@/components/BaseAsideCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'aside-card',

  components: { BaseAsideCard },

  computed: {
    ...mapGetters(['routes']),
    routesChildren () {
      let routesChildren = []
      this.routes.forEach(route => {
        if (route.children && route.children.length > 0) {
          route.children.forEach(item => { item.parentPath = route.path })
          routesChildren.push(...route.children)
        } else {
          routesChildren.push(route)
        }
      })
      routesChildren = routesChildren.filter(route => !route.hidden)
      return routesChildren
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/handler.scss';
.aside-card{
  width: 100px;
  @include bg-color('baseBg');
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.plate-img{
  width: 60px;
  height: 60px;
  display: inline-block;
  background-size: 100%;
  // background-image: url('../../../assets/layout/aside/plate.png');
  background-image: url('../../../assets/layout/aside/logo.png');
  vertical-align: middle;
  margin: 12px 0;
  background-repeat: no-repeat;
}
</style>
